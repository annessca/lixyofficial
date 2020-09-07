---
title: Working with jsonb in ActiveAdmin
date: 2019-05-30 19:02 UTC
author: Afam Agbodike
fa: fa-laptop
summary_img: activeadmin-jsonb/writing-json.jpg
tags: ruby, activeadmin, formtastic, rails, json
---

ActiveAdmin is a great framework for quickly creating attractive and powerful
administrative interfaces for Ruby on Rails applications. It can handle all
sorts of data fields, but for more complex database columns (such as
PostgreSQL's jsonb data type), it needs to be customized in to handle the data.

In the LIXY assessment platform we want to allow our customers to configure the
behavior of our application for certain accounts and users to accommodate their
specific needs.

There are several ways to accomplish this in Ruby on Rails, but I like using
JSON data for this. Configurations are specific to the particular object that
is being configured. When we use JSON as an attribute, it doesn't require any
additional database calls to get the configuration information.

We will begin by creating a database migration to add the jsonb column to the
relevant table

```ruby
bundle exec rails g migration AddConfigToOrganizations config:jsonb
```

NOTE: I recommend you not allow NULL values. I believe that in most cases
(especially when dealing with JSON attributes) it is preferable to require a
value. Unfortunately you can't configure null or default values via the command line
generator[^1], so you'll need to modify the migration file. The final migration should look like:

```ruby
class AddConfigToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :config, :jsonb, null: false, default: {}
  end
end
```

Next you'll need to run the migration by executing: `bundle exec rake db:migrate`,
 which will apply the change to your database.

At this point, you can now view any existing organizations:

![Display organization object details](/images/blog/activeadmin-jsonb/aa-org-initial.png)

But if you try to create or edit an object, you will get a `Formtastic::UnknownInputError
- Unable to find input class JsonbInput` exception, as ActiveAdmin - which uses
Formtastic to build it's forms - doesn't know what to do with a jsonb column:

![JsonbInput exception details](/images/blog/activeadmin-jsonb/aa-jsonb-exception.png)

Uh oh!

But don't worry, there are a couple easy ways to solve this problem:

1. Edit the JSON data directly
1. Build a form that allows for editing the data, without needing to know the
   underlying structure

NOTE: Pick one option or the other, don't do both.

#### Option 1:
If you don't want / need well structured data, or will have only technical people
that need to edit the data, you can simply use the [activeadmin_json_editor] gem,
which will create a very pretty editing window for your JSON data:

The install / configuration instructions can be found on the gem's page, but the
code needed to get it to display on ActiveAdmin is straightforward:

```ruby
# filename: app/admin/organizations.rb

permit_params :name, :config

form do |f|
  f.inputs do
    f.input :name
    f.input :config, as: :jsonb
  end
end
```

![Fancy json editor](/images/blog/activeadmin-jsonb/aa-jsonb-editor.png)

If that's all you need, then you are done! You can now edit
your JSON data right in Active Admin, pretty cool right?

#### Option 2:
For my use case we will have structured data since I will be using it to
configure specific functionality. I'm designing it for people that are not very
technical, so we need to be able to generate a much more user friendly form.

Since I know what my data will look like, I can create a form that allows the
user to directly modify the specific configuration element they want, without
having to worry about the structure of the data.

For example, this application is for building assessments, and each assessment has
a set of steps, but not everybody uses the word "assessment", or "step". Maybe
they call it a "test", and "skill", so we want to allow them to make those
customizations. For this we'll use a keys of "assessment_label", and
"skill_label" for the config param.

This is where things start to get a little tricky. Formtastic is great for
working with Rails models, but it's not designed to work with any arbitrary data
structure.

First we'll need to set up the params that ActiveAdmin accepts, and then tell
formtastic how to present it:

```ruby
permit_params :name, config: :assessment_label

form do |f|
  f.inputs do
    f.input :name, as: :string
    f.inputs name: 'Config', for: :config do |g|
      g.input :assessment_label,
              require: false,
              input_html: { value: organization.config['assessment_label'] }
      g.input :skill_label,
              require: false,
              input_html: { value: organization.config['skill_label'] }
    end
  end
end
```

![jsonb form fields](/images/blog/activeadmin-jsonb/aa-jsonb-fields.png)

Now, it's a little laborious to have to type `organization.config['key_name']` for
every attribute we want to use. We can use rails' `store_accessor`[^2] [^3] to add
accessor methods to the model dry up our code:


```ruby
# filename: app/models/organization.rb

class Organization < ApplicationRecord
  validates :name, presence: true

  store_accessor :config, :assessment_label, :skill_label
end
```

`store_accessor` gives us direct access to the keys in the JSON attribute, allowing us
to change: `input_html: { value: organization.config['skill_label'] }` to:
`input_html: { value: organization.skill_label }`. Additionally, you no longer
need the extra attributes on the input.

If we have a lot of attributes we want to mange, we can get even more DRY and
change our code to iterate over the array of attributes to generate the form
inputs:

```ruby
form do |f|
  f.inputs do
    f.input :name
    f.inputs name: 'Config', for: :config do |g|
      Organization.stored_attributes[:config].each do |accessor|
        g.input accessor,
                required: false,
                input_html: { value: organization.send(accessor) }
      end
    end
  end

  f.actions
end
```

-----

### More Neat Tricks:

#### Storext

You can add type-constraints, and additional features by taking advantage of the
[storext](https://rubygems.org/gems/storext/) gem. With storext you can define
additional information on the attributes, such as type and defaults. Add `gem
'storext' to your Gemfile, and change your model to include Storext:

```ruby
# filename: app/models/organization.rb

class Organization < ApplicationRecord
  include Storext.model

  validates :name, presence: true

  store_attributes :config do
    assessment_label String
    skill_label String, default: 'Talent'
  end
end
```

#### Form Display

One cool little thing I discovered while writing this was that the nesting of the
config portion of the form is optional, if you remove the `|g|` from the inputs
block, the nesting goes away:

```ruby
form do |f|
  f.inputs do
    f.input :name
    f.inputs name: 'Config', for: :config do
      Organization.stored_attributes[:config].each do |accessor|
        f.input accessor,
                required: false,
                input_html: { value: organization.send(accessor) }
      end
    end
  end

  f.actions
end
```

This yields a form without nesting the `config` fields:

![jsonb form fields with no nesting](/images/blog/activeadmin-jsonb/aa-unnested-form.png)

You can also create the form without the 'Config' section at all:

```ruby
form do |f|
  f.inputs do
    f.input :name
    f.inputs for: :config do
      Organization.stored_attributes[:config].each do |accessor|
        f.input accessor,
                required: false,
                input_html: { value: organization.send(accessor) }
      end
    end
  end

  f.actions
end
```

Which creates the form with no separator:

![form fields with no label separator](/images/blog/activeadmin-jsonb/aa-form-no-config.png)

Lastly, you can make the form appear as if the JSON keys are individual columns
in the table by omitting the inner form loop on the `:config` attribute:

```ruby
form do |f|
  f.inputs do
    f.input :name
    Organization.stored_attributes[:config].each do |accessor|
      f.input accessor
    end
  end

  f.actions
end
```

or if you want (perhaps to present only a subset of the attributes), explicitly declaring
the inputs the same way you would if they were table attributes:

```ruby
form do |f|
  f.inputs do
    f.input :name
    f.input :assessment_label
    f.input :skill_label
  end

  f.actions
end
```

This generates a form that appears like the attributes exist are native
ActiveModel attributes:

![Native appearance form fields](/images/blog/activeadmin-jsonb/aa-form-native.png)

-----

#### Requirements:

We assume you are using at least the following:

* Ruby on Rails 4.2+
* postgres 9.4+
* ActiveAdmin

**NOTE:** Since ActiveAdmin uses Formtastic for building it's forms, you may be able
to use the same approach to building forms for jsonb columns for Formtastic, and
possibly adapt it withhout too much effort to other rails form builders 

[activeadmin_json_editor]: https://github.com/udacity/activeadmin_json_editor
[^1]: https://guides.rubyonrails.org/active_record_migrations.html#column-modifiers
[^2]: https://api.rubyonrails.org/classes/ActiveRecord/Store.html
[^3]: https://apidock.com/rails/ActiveRecord/Store/ClassMethods/store_accessor
