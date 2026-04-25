const fs = require('fs');

const snippets = {};
function addSnippet(name, prefix, bodyLines, desc) {
    snippets[name] = { prefix, body: bodyLines, description: desc };
}

// 1. Factory Method
addSnippet("Factory Method - Mega", "dp-factory", [
    "// --- Factory Method Pattern Mega-Snippet ---",
    "interface Product { void operation(); }",
    "class ConcreteProduct implements Product {",
    "    public void operation() { System.out.println(\"ConcreteProduct operation executed.\"); }",
    "}",
    "abstract class Creator {",
    "    public abstract Product createProduct();",
    "    public void someOperation() { Product product = createProduct(); product.operation(); }",
    "}",
    "class ConcreteCreator extends Creator {",
    "    public Product createProduct() { return new ConcreteProduct(); }",
    "}",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        Creator creator = new ConcreteCreator();",
    "        creator.someOperation();",
    "    }",
    "}"
], "Full Factory Method Implementation");
addSnippet("Factory Method - Theory", "dp-factory-theory", [
    "/*",
    " * Design Pattern: Factory Method",
    " * [Bối cảnh]: Cần tạo object mà không chỉ định rõ lớp cụ thể.",
    " * [Vấn đề]: Code bị gắn chặt (coupling) với các lớp cụ thể.",
    " * [Giải pháp]: Định nghĩa interface để tạo object, để lớp con quyết định class nào sẽ được tạo.",
    " * ",
    " * [Diagram]:",
    " *   Creator <-- ConcreteCreator",
    " *      |             |",
    " *   Product <-- ConcreteProduct",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo interface Product.java (gõ: dp-factory-product)",
    " *   2. Tạo class ConcreteProduct.java (gõ: dp-factory-concrete-product)",
    " *   3. Tạo abstract class Creator.java (gõ: dp-factory-creator)",
    " *   4. Tạo class ConcreteCreator.java (gõ: dp-factory-concrete-creator)",
    " *   5. Tạo class Main.java (gõ: dp-factory-main)",
    " */"
], "Factory Method - Theory");
addSnippet("Factory Method - Interface", "dp-factory-product", [
    "package ${1:package_name};",
    "",
    "public interface ${2:Product} {",
    "    void ${3:operation}();",
    "}"
], "Factory Method - Product Interface");
addSnippet("Factory Method - Concrete Product", "dp-factory-concrete-product", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteProduct} implements ${3:Product} {",
    "    @Override",
    "    public void ${4:operation}() {",
    "        System.out.println(\"${2:ConcreteProduct} operation executed.\");",
    "    }",
    "}"
], "Factory Method - Concrete Product");
addSnippet("Factory Method - Creator", "dp-factory-creator", [
    "package ${1:package_name};",
    "",
    "public abstract class ${2:Creator} {",
    "    public abstract ${3:Product} createProduct();",
    "",
    "    public void someOperation() {",
    "        $3 product = createProduct();",
    "        product.operation();",
    "    }",
    "}"
], "Factory Method - Creator");
addSnippet("Factory Method - Concrete Creator", "dp-factory-concrete-creator", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteCreator} extends ${3:Creator} {",
    "    @Override",
    "    public ${4:Product} createProduct() {",
    "        return new ${5:ConcreteProduct}();",
    "    }",
    "}"
], "Factory Method - Concrete Creator");
addSnippet("Factory Method - Main", "dp-factory-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Creator} creator = new ${3:ConcreteCreator}();",
    "        creator.someOperation();",
    "    }",
    "}"
], "Factory Method - Main");

// 2. Abstract Factory
addSnippet("Abstract Factory - Mega", "dp-abstract-factory", [
    "// --- Abstract Factory Pattern Mega-Snippet ---",
    "interface ProductA { void operationA(); }",
    "interface ProductB { void operationB(); }",
    "interface AbstractFactory {",
    "    ProductA createProductA();",
    "    ProductB createProductB();",
    "}",
    "class ConcreteFactory1 implements AbstractFactory {",
    "    public ProductA createProductA() { return () -> System.out.println(\"Product A1 operation.\"); }",
    "    public ProductB createProductB() { return () -> System.out.println(\"Product B1 operation.\"); }",
    "}",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        AbstractFactory factory = new ConcreteFactory1();",
    "        ProductA a = factory.createProductA();",
    "        ProductB b = factory.createProductB();",
    "        a.operationA();",
    "        b.operationB();",
    "    }",
    "}"
], "Full Abstract Factory Implementation");
addSnippet("Abstract Factory - Theory", "dp-abstract-factory-theory", [
    "/*",
    " * Design Pattern: Abstract Factory",
    " * [Bối cảnh]: Tạo các family của các object liên quan mà không cần chỉ rõ lớp cụ thể.",
    " * [Giải pháp]: Cung cấp một interface để tạo các nhóm object liên quan.",
    " * ",
    " * [Diagram]:",
    " *   AbstractFactory --> ProductA, ProductB",
    " *   ConcreteFactory1 creates ProductA1, ProductB1",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo interface ProductA.java (gõ: dp-abstract-factory-product-a)",
    " *   2. Tạo interface ProductB.java (gõ: dp-abstract-factory-product-b)",
    " *   3. Tạo interface AbstractFactory.java (gõ: dp-abstract-factory-interface)",
    " *   4. Tạo class ConcreteFactory1.java (gõ: dp-abstract-factory-concrete)",
    " *   5. Tạo class Main.java (gõ: dp-abstract-factory-main)",
    " */"
], "Abstract Factory - Theory");
addSnippet("Abstract Factory - AbstractFactory", "dp-abstract-factory-interface", [
    "package ${1:package_name};",
    "",
    "public interface ${2:AbstractFactory} {",
    "    ${3:ProductA} createProductA();",
    "    ${4:ProductB} createProductB();",
    "}"
], "Abstract Factory - Interface");
addSnippet("Abstract Factory - ConcreteFactory", "dp-abstract-factory-concrete", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteFactory1} implements ${3:AbstractFactory} {",
    "    @Override",
    "    public ${4:ProductA} createProductA() {",
    "        return () -> System.out.println(\"Product A1 operation.\");",
    "    }",
    "",
    "    @Override",
    "    public ${5:ProductB} createProductB() {",
    "        return () -> System.out.println(\"Product B1 operation.\");",
    "    }",
    "}"
], "Abstract Factory - Concrete Factory 1");
addSnippet("Abstract Factory - ProductA", "dp-abstract-factory-product-a", [
    "package ${1:package_name};",
    "",
    "public interface ${2:ProductA} {",
    "    void operationA();",
    "}"
], "Abstract Factory - ProductA Interface");
addSnippet("Abstract Factory - ProductB", "dp-abstract-factory-product-b", [
    "package ${1:package_name};",
    "",
    "public interface ${2:ProductB} {",
    "    void operationB();",
    "}"
], "Abstract Factory - ProductB Interface");
addSnippet("Abstract Factory - Concrete Product", "dp-abstract-factory-concrete-product", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteProduct} implements ${3:ProductInterface} {",
    "    @Override",
    "    public void ${4:operation}() {",
    "        System.out.println(\"${2:ConcreteProduct} created.\");",
    "    }",
    "}"
], "Abstract Factory - Concrete Product (Reusable)");
addSnippet("Abstract Factory - ConcreteFactory (Classic Object creation)", "dp-abstract-factory-concrete-classic", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteFactory1} implements ${3:AbstractFactory} {",
    "    @Override",
    "    public ${4:ProductA} createProductA() {",
    "        return new ${5:ConcreteProductA1}();",
    "    }",
    "",
    "    @Override",
    "    public ${6:ProductB} createProductB() {",
    "        return new ${7:ConcreteProductB1}();",
    "    }",
    "}"
], "Abstract Factory - Concrete Factory (Classic Objects instead of Lambda)");
addSnippet("Abstract Factory - Main", "dp-abstract-factory-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:AbstractFactory} factory = new ${3:ConcreteFactory1}();",
    "        ${4:ProductA} a = factory.createProductA();",
    "        ${5:ProductB} b = factory.createProductB();",
    "        a.operationA();",
    "        b.operationB();",
    "    }",
    "}"
], "Abstract Factory - Demo Main");

// 3. Singleton
addSnippet("Singleton - Mega", "dp-singleton-mega", [
    "public class ${1:Singleton} {",
    "    private static volatile $1 instance;",
    "    private $1() {}",
    "    public static $1 getInstance() {",
    "        if (instance == null) {",
    "            synchronized ($1.class) {",
    "                if (instance == null) {",
    "                    instance = new $1();",
    "                }",
    "            }",
    "        }",
    "        return instance;",
    "    }",
    "    public static void main(String[] args) {",
    "        $1 s1 = $1.getInstance();",
    "        $1 s2 = $1.getInstance();",
    "        System.out.println(\"Are both instances same? \" + (s1 == s2));",
    "    }",
    "}"
], "Full Singleton Pattern Implementation");
addSnippet("Singleton - Theory", "dp-singleton-theory", [
    "/*",
    " * Design Pattern: Singleton",
    " * [Bối cảnh]: Hệ thống chỉ cần duy nhất một instance của một class.",
    " * [Giải pháp]: Đảm bảo một class chỉ có một instance và cung cấp điểm truy cập toàn cục.",
    " * ",
    " * [Diagram]:",
    " *   Singleton { static instance, static getInstance() }",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo class Singleton.java (gõ: dp-singleton)",
    " *   2. Tạo class Main.java (gõ: dp-singleton-main)",
    " */"
], "Singleton - Theory");
addSnippet("Singleton - Thread Safe", "dp-singleton", [
    "package ${1:package_name};",
    "",
    "public class ${2:Singleton} {",
    "    private static volatile $2 instance;",
    "",
    "    private $2() {}",
    "",
    "    public static $2 getInstance() {",
    "        if (instance == null) {",
    "            synchronized ($2.class) {",
    "                if (instance == null) {",
    "                    instance = new $2();",
    "                }",
    "            }",
    "        }",
    "        return instance;",
    "    }",
    "}"
], "Singleton - Thread Safe Class");
addSnippet("Singleton - Main", "dp-singleton-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Singleton} s1 = $2.getInstance();",
    "        $2 s2 = $2.getInstance();",
    "        System.out.println(\"Are both instances same? \" + (s1 == s2));",
    "    }",
    "}"
], "Singleton - Demo Main");

// 4. Strategy
addSnippet("Strategy - Mega", "dp-strategy-mega", [
    "interface Strategy { void execute(); }",
    "class ConcreteStrategy implements Strategy {",
    "    public void execute() { System.out.println(\"ConcreteStrategy executed.\"); }",
    "}",
    "class Context {",
    "    private Strategy strategy;",
    "    public void setStrategy(Strategy strategy) { this.strategy = strategy; }",
    "    public void executeOperation() { if (strategy != null) { strategy.execute(); } }",
    "}",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        Context context = new Context();",
    "        context.setStrategy(new ConcreteStrategy());",
    "        context.executeOperation();",
    "    }",
    "}"
], "Full Strategy Implementation");
addSnippet("Strategy - Theory", "dp-strategy-theory", [
    "/*",
    " * Design Pattern: Strategy",
    " * [Bối cảnh]: Chọn thuật toán linh hoạt lúc runtime, tránh if-else dài.",
    " * [Giải pháp]: Tách biệt phần thuật toán thành một interface riêng và inject vào Context.",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo interface Strategy.java (gõ: dp-strategy-interface)",
    " *   2. Tạo class ConcreteStrategy.java (gõ: dp-strategy-concrete)",
    " *   3. Tạo class Context.java (gõ: dp-strategy-context)",
    " *   4. Tạo class Main.java (gõ: dp-strategy-main)",
    " */"
], "Strategy Theory");
addSnippet("Strategy - Interface", "dp-strategy-interface", [
    "package ${1:package_name};",
    "",
    "public interface ${2:Strategy} {",
    "    void ${3:execute}();",
    "}"
], "Strategy Interface");
addSnippet("Strategy - Concrete", "dp-strategy-concrete", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteStrategy} implements ${3:Strategy} {",
    "    @Override",
    "    public void ${4:execute}() {",
    "        System.out.println(\"${2:ConcreteStrategy} executed.\");",
    "    }",
    "}"
], "Concrete Strategy");
addSnippet("Strategy - Context", "dp-strategy-context", [
    "package ${1:package_name};",
    "",
    "public class ${2:Context} {",
    "    private ${3:Strategy} strategy;",
    "",
    "    public void setStrategy($3 strategy) {",
    "        this.strategy = strategy;",
    "    }",
    "",
    "    public void executeOperation() {",
    "        if (strategy != null) {",
    "            strategy.execute();",
    "        }",
    "    }",
    "}"
], "Strategy Context");
addSnippet("Strategy - Main", "dp-strategy-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Context} context = new $2();",
    "        context.setStrategy(new ${3:ConcreteStrategy}());",
    "        context.executeOperation();",
    "    }",
    "}"
], "Strategy Main");

// 5. State
addSnippet("State - Mega", "dp-state-mega", [
    "interface State { void handle(Context context); }",
    "class ConcreteStateA implements State {",
    "    public void handle(Context context) {",
    "        System.out.println(\"State A handling. Switching to State B.\");",
    "        context.setState(new ConcreteStateB());",
    "    }",
    "}",
    "class ConcreteStateB implements State {",
    "    public void handle(Context context) {",
    "        System.out.println(\"State B handling. Switching to State A.\");",
    "        context.setState(new ConcreteStateA());",
    "    }",
    "}",
    "class Context {",
    "    private State state;",
    "    public Context() { this.state = new ConcreteStateA(); }",
    "    public void setState(State state) { this.state = state; }",
    "    public void request() { state.handle(this); }",
    "}",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        Context context = new Context();",
    "        context.request();",
    "        context.request();",
    "    }",
    "}"
], "Full State Implementation");
addSnippet("State - Theory", "dp-state-theory", [
    "/*",
    " * Design Pattern: State",
    " * [Bối cảnh]: Object thay đổi hành vi tương ứng với trạng thái nội bộ của nó.",
    " * [Giải pháp]: Đóng gói mỗi trạng thái vào một class riêng.",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo interface State.java (gõ: dp-state-interface)",
    " *   2. Tạo class ConcreteStateA.java (gõ: dp-state-concrete) -- copy tương tự cho State B, C",
    " *   3. Tạo class Context.java (gõ: dp-state-context)",
    " *   4. Tạo class Main.java (gõ: dp-state-main)",
    " */"
], "State Theory");
addSnippet("State - Interface", "dp-state-interface", [
    "package ${1:package_name};",
    "",
    "public interface ${2:State} {",
    "    void ${3:handle}(${4:Context} context);",
    "}"
], "State Interface");
addSnippet("State - Concrete", "dp-state-concrete", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteStateA} implements ${3:State} {",
    "    @Override",
    "    public void ${4:handle}(${5:Context} context) {",
    "        System.out.println(\"State A handling. Switching to State B.\");",
    "        context.setState(new ${6:ConcreteStateB}());",
    "    }",
    "}"
], "State Concrete");
addSnippet("State - Context", "dp-state-context", [
    "package ${1:package_name};",
    "",
    "public class ${2:Context} {",
    "    private ${3:State} state;",
    "",
    "    public $2() {",
    "        this.state = new ${4:ConcreteStateA}();",
    "    }",
    "",
    "    public void setState($3 state) {",
    "        this.state = state;",
    "    }",
    "",
    "    public void request() {",
    "        state.handle(this);",
    "    }",
    "}"
], "State Context");
addSnippet("State - Main", "dp-state-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Context} context = new $2();",
    "        context.request();",
    "    }",
    "}"
], "State Main");

// 6. Decorator
addSnippet("Decorator - Mega", "dp-decorator-mega", [
    "interface Component { void operation(); }",
    "class ConcreteComponent implements Component {",
    "    public void operation() { System.out.println(\"Basic component logic.\"); }",
    "}",
    "abstract class Decorator implements Component {",
    "    protected Component component;",
    "    public Decorator(Component component) { this.component = component; }",
    "    public void operation() { component.operation(); }",
    "}",
    "class ConcreteDecorator extends Decorator {",
    "    public ConcreteDecorator(Component component) { super(component); }",
    "    public void operation() {",
    "        super.operation();",
    "        addedBehavior();",
    "    }",
    "    private void addedBehavior() {",
    "        System.out.println(\"ConcreteDecorator added behavior.\");",
    "    }",
    "}",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        Component c = new ConcreteDecorator(new ConcreteComponent());",
    "        c.operation();",
    "    }",
    "}"
], "Full Decorator Implementation");
addSnippet("Decorator - Theory", "dp-decorator-theory", [
    "/*",
    " * Design Pattern: Decorator",
    " * [Bối cảnh]: Thêm hành vi cho object tại runtime mà không thay đổi code class gốc.",
    " * [Giải pháp]: Bọc object gốc trong các class trang trí có cùng interface.",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo interface Component.java (gõ: dp-decorator-interface)",
    " *   2. Tạo class ConcreteComponent.java (gõ: dp-decorator-concrete)",
    " *   3. Tạo abstract class Decorator.java (gõ: dp-decorator-abstract)",
    " *   4. Tạo class ConcreteDecorator.java (gõ: dp-decorator-concrete-item)",
    " *   5. Tạo class Main.java (gõ: dp-decorator-main)",
    " */"
], "Decorator Theory");
addSnippet("Decorator - Interface", "dp-decorator-interface", [
    "package ${1:package_name};",
    "",
    "public interface ${2:Component} {",
    "    void ${3:operation}();",
    "}"
], "Decorator Interface");
addSnippet("Decorator - Concrete", "dp-decorator-concrete", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteComponent} implements ${3:Component} {",
    "    @Override",
    "    public void ${4:operation}() {",
    "        System.out.println(\"Basic component logic.\");",
    "    }",
    "}"
], "Decorator ConcreteComponent");
addSnippet("Decorator - Abstract", "dp-decorator-abstract", [
    "package ${1:package_name};",
    "",
    "public abstract class ${2:Decorator} implements ${3:Component} {",
    "    protected $3 component;",
    "",
    "    public $2($3 component) {",
    "        this.component = component;",
    "    }",
    "",
    "    @Override",
    "    public void ${4:operation}() {",
    "        component.$4();",
    "    }",
    "}"
], "Decorator Abstract");
addSnippet("Decorator - Concrete Item", "dp-decorator-concrete-item", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteDecorator} extends ${3:Decorator} {",
    "    public $2(${4:Component} component) {",
    "        super(component);",
    "    }",
    "",
    "    @Override",
    "    public void ${5:operation}() {",
    "        super.$5();",
    "        addedBehavior();",
    "    }",
    "",
    "    private void addedBehavior() {",
    "        System.out.println(\"ConcreteDecorator added behavior.\");",
    "    }",
    "}"
], "Decorator Concrete Item");
addSnippet("Decorator - Main", "dp-decorator-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Component} c = new ${3:ConcreteComponent}();",
    "        c = new ${4:ConcreteDecorator}(c);",
    "        c.operation();",
    "    }",
    "}"
], "Decorator Main");

// 7. Adapter
addSnippet("Adapter - Mega", "dp-adapter-mega", [
    "interface Target { void request(); }",
    "class Adaptee { ",
    "    public void specificRequest() { System.out.println(\"Adaptee specific request (legacy) executed.\"); }",
    "}",
    "class Adapter implements Target {",
    "    private Adaptee adaptee;",
    "    public Adapter(Adaptee adaptee) { this.adaptee = adaptee; }",
    "    public void request() { adaptee.specificRequest(); }",
    "}",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        Adaptee adaptee = new Adaptee();",
    "        Target target = new Adapter(adaptee);",
    "        target.request();",
    "    }",
    "}"
], "Adapter Mega Snippet");
addSnippet("Adapter - Theory", "dp-adapter-theory", [
    "/*",
    " * Design Pattern: Adapter",
    " * [Bối cảnh]: Kết nối hệ thống legacy công nghệ cũ, tránh thay đổi core logic.",
    " * [Giải pháp]: Tạo một lớp trung gian (Adapter) chuyển đổi interface của lớp cũ thành interface client mong muốn.",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo class Adaptee.java (lớp cũ) (gõ: dp-adapter-legacy)",
    " *   2. Tạo interface Target.java (interface đích) (gõ: dp-adapter-interface)",
    " *   3. Tạo class Adapter.java implement Target (gõ: dp-adapter-class)",
    " *   4. Tạo class Main.java (gõ: dp-adapter-main)",
    " */"
], "Adapter Theory");
addSnippet("Adapter - Interface", "dp-adapter-interface", [
    "package ${1:package_name};",
    "",
    "public interface ${2:Target} {",
    "    void ${3:request}();",
    "}"
], "Adapter Interface");
addSnippet("Adapter - Legacy", "dp-adapter-legacy", [
    "package ${1:package_name};",
    "",
    "public class ${2:Adaptee} {",
    "    public void ${3:specificRequest}() {",
    "        System.out.println(\"Adaptee specific request (legacy) executed.\");",
    "    }",
    "}"
], "Adapter Adaptee");
addSnippet("Adapter - Class", "dp-adapter-class", [
    "package ${1:package_name};",
    "",
    "public class ${2:Adapter} implements ${3:Target} {",
    "    private ${4:Adaptee} adaptee;",
    "",
    "    public $2($4 adaptee) {",
    "        this.adaptee = adaptee;",
    "    }",
    "",
    "    @Override",
    "    public void ${5:request}() {",
    "        adaptee.specificRequest();",
    "    }",
    "}"
], "Adapter Class");
addSnippet("Adapter - Main", "dp-adapter-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Adaptee} adaptee = new $2();",
    "        ${3:Target} target = new ${4:Adapter}(adaptee);",
    "        target.request();",
    "    }",
    "}"
], "Adapter Main");

// 8. Observer
addSnippet("Observer - Mega", "dp-observer-mega", [
    "import java.util.ArrayList;",
    "import java.util.List;",
    "",
    "interface Observer { void update(String message); }",
    "",
    "class Subject {",
    "    private List<Observer> observers = new ArrayList<>();",
    "    public void attach(Observer o) { observers.add(o); }",
    "    public void detach(Observer o) { observers.remove(o); }",
    "    public void notifyObservers(String message) {",
    "        for (Observer o : observers) { o.update(message); }",
    "    }",
    "}",
    "",
    "class ConcreteObserver implements Observer {",
    "    private String name;",
    "    public ConcreteObserver(String name) { this.name = name; }",
    "    public void update(String message) { System.out.println(\"Observer \" + name + \" received: \" + message); }",
    "}",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        Subject subject = new Subject();",
    "        subject.attach(new ConcreteObserver(\"1\"));",
    "        subject.notifyObservers(\"State changed!\");",
    "    }",
    "}"
], "Observer Mega");
addSnippet("Observer - Theory", "dp-observer-theory", [
    "/*",
    " * Design Pattern: Observer",
    " * [Bối cảnh]: Cần notify nhiều đối tượng khi trạng thái thay đổi, giảm coupling.",
    " * [Giải pháp]: Đăng ký danh sách các Observer vào Subject và gọi notify khi có thay đổi.",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo interface Observer.java (gõ: dp-observer-interface)",
    " *   2. Tạo class Subject.java (gõ: dp-observer-subject)",
    " *   3. Tạo class ConcreteObserver.java (gõ: dp-observer-concrete)",
    " *   4. Tạo class Main.java (gõ: dp-observer-main)",
    " */"
], "Observer Theory");
addSnippet("Observer - Interface", "dp-observer-interface", [
    "package ${1:package_name};",
    "",
    "public interface ${2:Observer} {",
    "    void ${3:update}(String message);",
    "}"
], "Observer Interface");
addSnippet("Observer - Subject", "dp-observer-subject", [
    "package ${1:package_name};",
    "",
    "import java.util.ArrayList;",
    "import java.util.List;",
    "",
    "public class ${2:Subject} {",
    "    private List<${3:Observer}> observers = new ArrayList<>();",
    "",
    "    public void attach($3 observer) { observers.add(observer); }",
    "    public void detach($3 observer) { observers.remove(observer); }",
    "",
    "    public void notifyObservers(String message) {",
    "        for ($3 observer : observers) {",
    "            observer.update(message);",
    "        }",
    "    }",
    "}"
], "Observer Subject");
addSnippet("Observer - Concrete", "dp-observer-concrete", [
    "package ${1:package_name};",
    "",
    "public class ${2:ConcreteObserver} implements ${3:Observer} {",
    "    private String name;",
    "",
    "    public $2(String name) {",
    "        this.name = name;",
    "    }",
    "",
    "    @Override",
    "    public void ${4:update}(String message) {",
    "        System.out.println(\"Observer \" + name + \" received: \" + message);",
    "    }",
    "}"
], "Observer Concrete");
addSnippet("Observer - Main", "dp-observer-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Subject} subject = new $2();",
    "        subject.attach(new ${3:ConcreteObserver}(\"1\"));",
    "        subject.notifyObservers(\"Event triggered!\");",
    "    }",
    "}"
], "Observer Main");

// 9. Composite
addSnippet("Composite - Mega", "dp-composite-mega", [
    "import java.util.ArrayList;",
    "import java.util.List;",
    "",
    "interface Component { void operation(); }",
    "",
    "class Leaf implements Component {",
    "    private String name;",
    "    public Leaf(String name) { this.name = name; }",
    "    public void operation() { System.out.println(\"Leaf \" + name + \" operation.\"); }",
    "}",
    "",
    "class Composite implements Component {",
    "    private List<Component> children = new ArrayList<>();",
    "    public void add(Component c) { children.add(c); }",
    "    public void remove(Component c) { children.remove(c); }",
    "    public void operation() {",
    "        System.out.println(\"Composite operation starting...\");",
    "        for (Component child : children) child.operation();",
    "    }",
    "}",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        Composite root = new Composite();",
    "        root.add(new Leaf(\"A\"));",
    "        Composite sub = new Composite();",
    "        sub.add(new Leaf(\"B\"));",
    "        root.add(sub);",
    "        root.operation();",
    "    }",
    "}"
], "Composite Mega");
addSnippet("Composite - Theory", "dp-composite-theory", [
    "/*",
    " * Design Pattern: Composite",
    " * [Bối cảnh]: Khi cần quản lý một cấu trúc phân cấp (cây) các object.",
    " * [Giải pháp]: Cả Leaf và Composite đều implement chung một interface.",
    " *",
    " * [Các file cần tạo]:",
    " *   1. Tạo interface Component.java (gõ: dp-composite-component)",
    " *   2. Tạo class Leaf.java (gõ: dp-composite-leaf)",
    " *   3. Tạo class Composite.java (gõ: dp-composite-composite)",
    " *   4. Tạo class Main.java (gõ: dp-composite-main)",
    " */"
], "Composite Theory");
addSnippet("Composite - Component", "dp-composite-component", [
    "package ${1:package_name};",
    "",
    "public interface ${2:Component} {",
    "    void ${3:operation}();",
    "}"
], "Composite Component");
addSnippet("Composite - Leaf", "dp-composite-leaf", [
    "package ${1:package_name};",
    "",
    "public class ${2:Leaf} implements ${3:Component} {",
    "    private String name;",
    "",
    "    public $2(String name) {",
    "        this.name = name;",
    "    }",
    "",
    "    @Override",
    "    public void ${4:operation}() {",
    "        System.out.println(\"Leaf \" + name + \" operation.\");",
    "    }",
    "}"
], "Composite Leaf");
addSnippet("Composite - Composite", "dp-composite-composite", [
    "package ${1:package_name};",
    "",
    "import java.util.ArrayList;",
    "import java.util.List;",
    "",
    "public class ${2:Composite} implements ${3:Component} {",
    "    private List<$3> children = new ArrayList<>();",
    "",
    "    public void add($3 component) { children.add(component); }",
    "    public void remove($3 component) { children.remove(component); }",
    "",
    "    @Override",
    "    public void ${4:operation}() {",
    "        System.out.println(\"Composite operation starting...\");",
    "        for ($3 child : children) {",
    "            child.operation();",
    "        }",
    "    }",
    "}"
], "Composite Class");
addSnippet("Composite - Main", "dp-composite-main", [
    "package ${1:package_name};",
    "",
    "public class Main {",
    "    public static void main(String[] args) {",
    "        ${2:Composite} root = new $2();",
    "        root.add(new ${3:Leaf}(\"A\"));",
    "        root.operation();",
    "    }",
    "}"
], "Composite Main");

fs.writeFileSync('d:/HK2-2025-2026/KTvTKPM/HK2_2025-2026_KTPM/PatternSnippetExtension/snippets/snippets.code-snippets', JSON.stringify(snippets, null, 2));
