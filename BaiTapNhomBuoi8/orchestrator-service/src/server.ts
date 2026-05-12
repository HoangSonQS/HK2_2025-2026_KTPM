import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

type User = {
  id: string;
  name: string;
  email: string;
};

type Tour = {
  id: string;
  name: string;
  price: number;
  availableSeats: number;
};

type Booking = {
  id: string;
  userId: string;
  tourId: string;
  tourName: string;
  quantity: number;
  totalAmount: number;
  status: string;
};

type Payment = {
  id: string;
  bookingId: string;
  amount: number;
  status: "SUCCESS" | "FAILED";
  message: string;
};

class ServiceError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const app = express();
const port = Number(process.env.PORT ?? 8080);
const host = process.env.HOST ?? "0.0.0.0";

const USER_SERVICE_URL = process.env.USER_SERVICE_URL ?? "http://192.168.1.11:8081";
const TOUR_SERVICE_URL = process.env.TOUR_SERVICE_URL ?? "http://192.168.1.12:8082";
const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL ?? "http://192.168.1.13:8083";
const BOOKING_PAYMENT_SERVICE_URL = process.env.BOOKING_PAYMENT_SERVICE_URL ?? BOOKING_SERVICE_URL;

app.use(cors());
app.use(express.json());

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof data.message === "string" ? data.message : `Request failed: ${url}`;
    throw new ServiceError(message, response.status);
  }

  return data as T;
}

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    service: "orchestrator-service",
    status: "UP",
    dependencies: {
      user: USER_SERVICE_URL,
      tour: TOUR_SERVICE_URL,
      booking: BOOKING_SERVICE_URL,
      payment: BOOKING_PAYMENT_SERVICE_URL
    }
  });
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const loginResult = await requestJson<{ message: string; user: User }>(`${USER_SERVICE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(req.body)
    });

    return res.json(loginResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Dang nhap that bai";
    return res.status(401).json({ message });
  }
});

app.get("/tours", async (_req: Request, res: Response) => {
  try {
    const tours = await requestJson<Tour[]>(`${TOUR_SERVICE_URL}/tours`);
    return res.json(tours);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Khong the lay danh sach tour";
    return res.status(500).json({ message });
  }
});

app.get("/tours/:id", async (req: Request, res: Response) => {
  try {
    const tour = await requestJson<Tour>(`${TOUR_SERVICE_URL}/tours/${req.params.id}`);
    return res.json(tour);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Khong the lay chi tiet tour";
    return res.status(404).json({ message });
  }
});

app.post("/book-tour", async (req: Request, res: Response) => {
  const { userId, tourId, quantity } = req.body as {
    userId?: string;
    tourId?: string;
    quantity?: number;
  };

  if (!userId || !tourId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Vui long chon user, tour va so luong hop le" });
  }

  try {
    const user = await requestJson<User>(`${USER_SERVICE_URL}/users/${userId}`);
    const tour = await requestJson<Tour>(`${TOUR_SERVICE_URL}/tours/${tourId}`);

    if (quantity > tour.availableSeats) {
      return res.status(400).json({ message: "So cho con lai khong du" });
    }

    const totalAmount = tour.price * quantity;
    const booking = await requestJson<Booking>(`${BOOKING_SERVICE_URL}/bookings`, {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        tourId: tour.id,
        tourName: tour.name,
        quantity,
        totalAmount
      })
    });

    const payment = await requestJson<Payment>(`${BOOKING_PAYMENT_SERVICE_URL}/payments`, {
      method: "POST",
      body: JSON.stringify({
        bookingId: booking.id,
        amount: booking.totalAmount
      })
    });

    return res.status(201).json({
      message: "Dat tour va thanh toan thanh cong",
      confirmation: {
        user,
        tour,
        booking: { ...booking, status: "PAID" },
        payment
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Loi khong xac dinh";
    const status = error instanceof ServiceError && error.status === 402 ? 402 : 500;

    return res.status(status).json({
      message: "Orchestrator xu ly that bai",
      detail: message
    });
  }
});

app.listen(port, host, () => {
  console.log(`Orchestrator Service running at http://${host}:${port}`);
});
