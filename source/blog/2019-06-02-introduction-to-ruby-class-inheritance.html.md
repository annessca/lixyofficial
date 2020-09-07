---
title: Introduction to Ruby Class Inheritance
date: 2019-06-02 18:32 UTC
tags: ruby
author: Anne Essien
fa: fa-laptop
summary_img: class-inheritance/hero.png
---

## Understanding class inheritance in Ruby
Ruby is an [object-oriented programming language], and like most object-oriented programming languages, Ruby uses classes for the purpose of [data abstraction], [encapsulation], [polymorphism], and [inheritance]. The focus of this article is Ruby class inheritance.

### What is a class?
A [class] is a means of creating objects which have similar attributes. It means that for classes to be created, there have to be objects with shared or related characteristics who need to be severally and distinctly classified.

Defining a class in Ruby is as simple as using the `class` keyword and picking a name to identify it with. Just like defining a method you will close the class with the `end` keyword comes last to indicate the end of a particular class.

#### Example 1

```ruby
class MyClass
end
```

Classes are created to have [single responsibilities]. In order for a class to create objects to populate itself, it has to implement functionalities that pertain to the attributes(behaviour and state) of the objects to be created. These functionalities can be achieved through functions, better known as methods. Therefore, the class should have methods whose output achieves a particular purpose.

### Functions/Methods

In object-oriented programming, there are typically two types of functions: [class methods and instance methods].

Methods are vital to the class because all expressions of its state and behaviour are encoded in the method’s procedures and data variables. A method determines what attributes an object should have and the way it should behave. A method can have zero or more arguments depending on it’s definition.

Here is an example of a class with an instance method:

```ruby
class MyClass
  # instance method
  def an_instance_method()
    puts 'My Instance method implementation.'
  end
end
```

### Objects / Instances

An object is an "__instance__" of a class whose type is the class it belongs to. Objects are created at run time through the process of "__instantiation__" by invoking the class' constructor method: `new()`, which all Ruby classes have:

```ruby
var_1 = MyClass.new()
```

Now that we've created an object `var_1` for the class `MyClass`, we now have a class, an instantiated object, and a method. To give functionality to the object, we have to call a method on it.

**Note:** The method `an_instance_method` in our example does not have any parameters, so the object `var_1` has to call the method any arguments.

```ruby
var_1.an_intance_method() # => My instance method implementation.
```

### Class Inheritance

Classes are related to each other when they have similar attributes. If there are obvious similarities in related classes, code repetition will happen.

Inheritance allows you to apply the concept of code reusability through inheritance. With class inheritance, a programmer can create a new class that inherits features from an existing class instead of writing those features over again.

A class becomes a "__parent class__" when another class (a "__child class__") inherits some or all of it's features. The pair is also known as the "__super class__" and "__sub class__", or a "__base class__" and a "__derived class__".

Let's consider a class named `Person`. We want our `Person` class to only feature objects with attributes that pertain to people in the real sense of it. In that case the person object should have a name, have a designation, have a gender, and be capable of self introduction.

```ruby
class Person
  def introduction(name, designation, gender)
    puts 'I am #{name}, a #{gender} #{designation}.'
  end
end

# creating objects
person = Person.new()
person.introduction('Petera', 'supervisor', 'female')
# => I am Petera, a female supervisor
```

Now let’s create the `Teacher` class, which will inherit from the `Person` class:

```ruby
class Teacher < Person
  def portfolio(subject)
    puts 'I teach  #{subject}'
  end

  def student_marks(student_1, student_2, student_3)
    puts 'Marks recorded: #{student_1}, #{student_2},and #{student_3}'
  end
end
```

The `Teacher` class inherits the methods from `Person` because an object of the `Teacher`, meaning an instance of the `Teacher` class can also introduce itself, has a name, a designation, and gender. So instead of repeating any already existing code in the `Teacher` class, you can take advantage of inheritance to reuse the code.

```ruby
# creating objects
teacher = Teacher.new()

# calling a method from Person on the Teacher objects.
teacher.introduction('John', 'teacher', 'male')
# => I am John, a male teacher

# calling a method from Person on the Teacher objects.
teacher.portfolio('Biology')# => I teach Biology
teacher.student_marks(80, 60, 100)# => Marks recorded: 80, 60, 100
```

The `Teacher` class re-uses the functionality defined in `Person`, and only needs to implement code specific to a Teacher.

Next we introduce the `Student` class, as a teacher's role is to teach students.

```ruby
class Student < Person
  def subjects(subject_1, subject_2, subject_3)
    puts 'I major in  #{subject_1}, #{subject_2}, and  #{subject_3} '
  end
end

student = Student.new()
student.introduction('Jill', 'student', 'female')
# => I am Jill, a female student
```

### The single inheritance rule
Ruby only supports a single class inheritance. Therefore, a child class(subclass or derived class) can only have one parent class(superclass or base class), and should only inherit from that class.

Although Ruby does not allow a single class to inherit from multiple classes, it offers a alternative means for classes to share reusable code through the concept of Modules and Mixins.

### Modules and Mixins
A module is an object that has namespaces for variables, methods, and sometimes classes. It's definition is very similar to that of the class, only that instead of a __class__ keyword, you’ll have the __module__ instead. Let's create a `School` module in a file `school.rb`.

```ruby
# school.rb
module School
  TEACHERS = 50
  STUDENTS = 100
  def verify(id, designation)
    puts 'The ID #{id},belongs to a verified #{designation}.'
  end

  def population()
    puts 'A total of #{TEACHERS + STUDENTS} teachers and students'
  end
end
```

Classes can inherit any code within a module as a mixin. For this to work, you have to require the module's file inside the file defining your class, and then "__include__" the module within that class. There are no restrictions on the number of modules a class can get mixins from.

Here is how to mix in module objects in a class:

```ruby
$LOAD_PATH << '.'
require 'school'

class Teacher < Person
  def portfolio(subject)
    puts 'I teach  #{subject}'
  end

  def subject_marks(student_1, student_2, student_3)
    puts 'Marks recorded: #{student_1}, #{student_2},and #{student_3}'
  end
end

class Student < Person
  include School

  def subjects(subject_1, subject_2, subject_3)
    puts 'I major in  #{subject_1}, #{subject_2}, and  #{subject_3} '
  end
end

student = Student.new()
student.introduction('Jill', 'student', 'female')
student.verify('student_111', 'student')
student.population()

# The output
# => I am Jil, a female student
# => The ID student_111 belongs to a verified student.
# => A total of 150 teachers and students am Jil, a female student
```

### Method Overriding
[Method overriding][method-override] is a feature in object-oriented programming that allows a subclass to bypass the implementation of a method in its superclass (also known as parent class). To achieve this, the subclass defines a method with the same name as the target method in the superclass, but yields a different or specialized outcome. Whenever an object of the subclass makes a call to that method, the superclass' implementation of the method will be replaced by that of the subclass.

```ruby
class Person
  def motto
    puts 'To lead is to serve'
  end
end

class Student < Person
  # A method to override the superclass method
  def motto
    puts 'We are tomorrow’s leaders'
  end
end

student = Students.new()
student.motto # => We are tomorrow's leaders
```

### Invoking Methods from the Super Class

When the super class and the subclass share a method with the same signature, a call to that method by an object of the subclass always overrides the method of the superclass. The way to access the parent's version of the method is to invoke the super keyword.

If there are no parameters in the shared method, when `super` or `super()` is invoked, the logic of both methods are executed.

```ruby
class Person
  def motto
    puts 'To lead is to serve'
  end
end

class Student < Person
  # A method to override the superclass method
  def motto
    super() # Invoking super would give the same result.
    puts 'We are tomorrow’s leaders'
  end
end

student = Student.new()
student.motto

# => To lead is to serve
# => We are tomorrow's leaders
```

If there are arguments in the superclass' method, invoking `super()` will execute those arguments. This is because `super()` takes no arguments from the subclass.

```ruby
class Person
  def profile(id = 'teacher_001', name = 'James Bart')
    puts 'This profile belongs to #{name}, with ID #{id}'
  end
end

class Student < Person
  # calling super()
  def profile(id, name)
    super()
    puts 'We are tomorrow’s leaders'
  end
end

person = Student.new()
person.profile('student_001', 'Lisa Green')

# => This profile belongs to James Bart, with ID teacher_001
# => We are tomorrow’s leaders
```

If in the same situation we invoke `super` without brackets, the arguments from the subclass' method are passed to the parent class to be executed.

```ruby
class Person
  def profile(id = 'teacher_001', name = 'James Bart')
    puts 'This profile belongs to #{name}, with ID #{id}'
  end
end

class Student < Person
  # calling super()
  def profile(id, name)
    super
    puts 'We are tomorrow’s leaders'
  end
end

person = Student.new('student_001', 'Lisa Green')
person.profile('student_001', 'Lisa Green')

# => This profile belongs to Lisa Green, with ID student_001
# => We are tomorrow’s leaders
```

**Note:** One way to prevent the arguments of the subclass' object from being passed to the superclass is by calling super() in it’s method. On the other hand, one sure way to impose the arguments of the subclass’ object on the superclass is by calling for example; super(id, name) in the subclass.

### Conclusion

Class inheritance is a powerful feature in object oriented programming that prevents your program from having duplicated code. However, it should only be used sparingly when there are features to be shared among objects.

[object-oriented programming language]: https://en.wikipedia.org/wiki/Object-oriented_programming
[data abstraction]: https://www.defit.org/data-abstraction/
[encapsulation]: https://en.wikipedia.org/wiki/Object-oriented_programming#Encapsulation
[polymorphism]: https://stackify.com/oop-concept-polymorphism/
[inheritance]: https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)
[class]: https://en.wikipedia.org/wiki/Class_(computer_programming)
[single responsibilities]: https://en.wikipedia.org/wiki/Single_responsibility_principle
[class methods and instance methods]: https://dev.to/adamlombard/ruby-class-methods-vs-instance-methods-4aje
[method-override]: https://www.codesdope.com/ruby-more-with-oops/
