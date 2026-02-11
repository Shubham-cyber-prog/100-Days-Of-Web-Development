/**
 * Code Snippets Database
 * Organized by language and difficulty
 */

export const CODE_SNIPPETS = {
    javascript: {
        beginner: [
            `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconst message = greet("World");\nconsole.log(message);`,
            `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);`,
            `let count = 0;\nfor (let i = 0; i < 10; i++) {\n  count += i;\n}\nconsole.log(count);`
        ],
        intermediate: [
            `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Error:", error);\n    return null;\n  }\n}`,
            `const debounce = (func, delay) => {\n  let timeoutId;\n  return (...args) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n};`,
            `class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(element) {\n    this.items.push(element);\n  }\n  pop() {\n    return this.items.pop();\n  }\n  peek() {\n    return this.items[this.items.length - 1];\n  }\n}`
        ],
        advanced: [
            `function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}`,
            `const promiseAll = (promises) => {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let completed = 0;\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise)\n        .then(result => {\n          results[index] = result;\n          completed++;\n          if (completed === promises.length) {\n            resolve(results);\n          }\n        })\n        .catch(reject);\n    });\n  });\n};`,
            `function deepClone(obj, hash = new WeakMap()) {\n  if (obj === null) return null;\n  if (obj instanceof Date) return new Date(obj);\n  if (obj instanceof RegExp) return new RegExp(obj);\n  if (typeof obj !== "object") return obj;\n  if (hash.has(obj)) return hash.get(obj);\n  const cloneObj = new obj.constructor();\n  hash.set(obj, cloneObj);\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      cloneObj[key] = deepClone(obj[key], hash);\n    }\n  }\n  return cloneObj;\n}`
        ]
    },

    python: {
        beginner: [
            `def greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("World")\nprint(message)`,
            `numbers = [1, 2, 3, 4, 5]\ndoubled = [n * 2 for n in numbers]\nprint(doubled)`,
            `total = 0\nfor i in range(10):\n    total += i\nprint(total)`
        ],
        intermediate: [
            `class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n    \n    def perimeter(self):\n        return 2 * (self.width + self.height)`,
            `def fibonacci(n):\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return b`,
            `import json\n\ndef read_json_file(filename):\n    try:\n        with open(filename, 'r') as file:\n            data = json.load(file)\n            return data\n    except FileNotFoundError:\n        print(f"File {filename} not found")\n        return None`
        ],
        advanced: [
            `def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)`,
            `from functools import wraps\n\ndef cache(func):\n    cached_results = {}\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        key = str(args) + str(kwargs)\n        if key not in cached_results:\n            cached_results[key] = func(*args, **kwargs)\n        return cached_results[key]\n    return wrapper`,
            `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        current = self.head\n        while current.next:\n            current = current.next\n        current.next = new_node`
        ]
    },

    java: {
        beginner: [
            `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
            `int[] numbers = {1, 2, 3, 4, 5};\nint sum = 0;\nfor (int num : numbers) {\n    sum += num;\n}\nSystem.out.println(sum);`,
            `String name = "Java";\nif (name.equals("Java")) {\n    System.out.println("Hello " + name);\n}`
        ],
        intermediate: [
            `public class Rectangle {\n    private double width;\n    private double height;\n    \n    public Rectangle(double w, double h) {\n        width = w;\n        height = h;\n    }\n    \n    public double area() {\n        return width * height;\n    }\n}`,
            `import java.util.ArrayList;\nimport java.util.List;\n\npublic List<Integer> filterEven(List<Integer> numbers) {\n    List<Integer> result = new ArrayList<>();\n    for (Integer num : numbers) {\n        if (num % 2 == 0) {\n            result.add(num);\n        }\n    }\n    return result;\n}`,
            `public class Counter {\n    private int count = 0;\n    \n    public synchronized void increment() {\n        count++;\n    }\n    \n    public int getCount() {\n        return count;\n    }\n}`
        ],
        advanced: [
            `public class BinarySearch {\n    public static int search(int[] arr, int target) {\n        int left = 0;\n        int right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`,
            `interface Observer {\n    void update(String message);\n}\n\nclass Subject {\n    private List<Observer> observers = new ArrayList<>();\n    \n    public void attach(Observer observer) {\n        observers.add(observer);\n    }\n    \n    public void notifyObservers(String msg) {\n        for (Observer ob : observers) {\n            ob.update(msg);\n        }\n    }\n}`,
            `public class QuickSort {\n    public static void sort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            sort(arr, low, pi - 1);\n            sort(arr, pi + 1, high);\n        }\n    }\n    \n    private static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n        return i + 1;\n    }\n}`
        ]
    },

    cpp: {
        beginner: [
            `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
            `int sum = 0;\nfor (int i = 0; i < 10; i++) {\n    sum += i;\n}\ncout << sum << endl;`,
            `int arr[] = {1, 2, 3, 4, 5};\nint size = sizeof(arr) / sizeof(arr[0]);\nfor (int i = 0; i < size; i++) {\n    cout << arr[i] << " ";\n}`
        ],
        intermediate: [
            `class Rectangle {\nprivate:\n    double width;\n    double height;\npublic:\n    Rectangle(double w, double h) : width(w), height(h) {}\n    double area() {\n        return width * height;\n    }\n};`,
            `#include <vector>\n#include <algorithm>\n\nvector<int> filterEven(vector<int> nums) {\n    vector<int> result;\n    for (int num : nums) {\n        if (num % 2 == 0) {\n            result.push_back(num);\n        }\n    }\n    return result;\n}`,
            `template <typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nint main() {\n    cout << maximum(10, 20) << endl;\n    cout << maximum(3.14, 2.71) << endl;\n    return 0;\n}`
        ],
        advanced: [
            `#include <memory>\n\nclass Node {\npublic:\n    int data;\n    shared_ptr<Node> next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nclass LinkedList {\nprivate:\n    shared_ptr<Node> head;\npublic:\n    void append(int data) {\n        auto newNode = make_shared<Node>(data);\n        if (!head) {\n            head = newNode;\n            return;\n        }\n        auto current = head;\n        while (current->next) {\n            current = current->next;\n        }\n        current->next = newNode;\n    }\n};`,
            `template <typename T>\nclass Stack {\nprivate:\n    vector<T> items;\npublic:\n    void push(const T& item) {\n        items.push_back(item);\n    }\n    T pop() {\n        if (items.empty()) throw runtime_error("Stack underflow");\n        T top = items.back();\n        items.pop_back();\n        return top;\n    }\n    bool isEmpty() const {\n        return items.empty();\n    }\n};`,
            `void quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                swap(arr[i], arr[j]);\n            }\n        }\n        swap(arr[i + 1], arr[high]);\n        int pi = i + 1;\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`
        ]
    }
};

/**
 * Get a random snippet for specified language and difficulty
 */
export function getRandomSnippet(language, difficulty) {
    const snippets = CODE_SNIPPETS[language]?.[difficulty];
    if (!snippets || snippets.length === 0) {
        return CODE_SNIPPETS.javascript.beginner[0];
    }
    const randomIndex = Math.floor(Math.random() * snippets.length);
    return snippets[randomIndex];
}
