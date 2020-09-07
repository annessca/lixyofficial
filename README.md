# lixyofficial

### This is the main lixy.tech website project

#### It uses [middleman] to build and deploy the site

View the site locally:

`bundle exec middleman server` or just `bundle exec middleman`

Add `--verbose` flag to see detailed logging

Build the site to prepare for deploy:

`bundle exec middleman build`

Deploy the app (uses [middleman-deploy] gem):

`bundle exec middleman deploy` (this can be done even without previously
building).

### Blog

#### Generate a new blog article:

`bundle exec middleman article ARTICLE_TITLE`

**Note:** You can add the --date tag to generate it for a specific date

#### Writing articles

##### Metadata
Once you've created the article you should add the [frontmatter] (the metadata
found out the top of each article providing)

* `author`: used to present the author
* `tags`: comma separated list of tags related to the main topics of the article
* `fa`: any font-awesome font that you want to appear in the upper left corner of
  the summary image
* `summary_img`: the image that will appear with the summary, as well at the
  beginning of the article  
  **NOTE:** the path will prepend '/images/blog/' to the beginning of the image URL,
  make sure you place the file in the appropriate location under images in order
  to load it.

##### Code blocks
you can use fenced code blocks `\`\`\`` to create code sections

##### Captions
In your markdown, you can wrap your caption with the emphasis tag and put it directly underneath the image or code block without inserting a new line like so:

```
![](path_to_image)
*caption*
```

or

```
\`\`\`
def foo
end
*caption*
\`\`\`
```

This would generate the following HTML:

```
<p>
    <img src="path_to_image" alt>
    <em>image_caption</em>
</p>
```

Then in your CSS you can style it using the following selector without interfering with other em tags on the page:
**NOTE:** this still needs to be styled.
**NOTE:** the generated code is different for code blocks, may not be easy to style.

```
img + em { }
```

Note that you must not have a blank line between the image and the caption because that would instead generate:

```
<p>
    <img src="path_to_image" alt>
</p>
<p>
    <em>image_caption</em>
</p>
```
https://stackoverflow.com/questions/19331362/using-an-image-caption-in-markdown-jekyll


### Software used in this site:
* [middleman] to build the static website
* [middleman-blog] to manage blog entries
* [middleman-deploy] to manage deploying the code

[frontmatter]: https://middlemanapp.com/basics/frontmatter/
[middleman]: https://middlemanapp.com/
[middleman-blog]: https://middlemanapp.com/basics/blogging/
[middleman-deploy]: https://github.com/karlfreeman/middleman-deploy
