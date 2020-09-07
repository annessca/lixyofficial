require 'lib/custom_helpers'
helpers CustomHelpers

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

###
# Page options, layouts, aliases and proxies
###
# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
# https://middlemanapp.com/basics/helper-methods/
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end

activate :blog do |blog|
  blog.prefix = "blog" # This will add a prefix to all links, template references and source paths
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.permalink = "{year}/{month}/{title}.html"

  # blog.taglink = "tags/{tag}.html"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  blog.default_extension = ".md"
  blog.layout = "blog_layout"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 3
  blog.page_link = "page/{num}"
end

page "/feed.xml", layout: false
page "/index.html", layout: :shared
page "/contact.html", layout: :shared

set :markdown_engine, :redcarpet
set :markdown, autolink: true,
               fenced_code_blocks: true,
               disable_indented_code_blocks: true,
               footnotes: true,
               highlight: true,
               no_intra_emphasis: true,
               smartypants: true,
               space_after_headers: true,
               strikethrough: true,
               superscript: true,
               tables: true,
               underline: true

activate :deploy do |deploy|
  deploy.deploy_method = :rsync
  deploy.host          = 'afaagb@lixy.tech'
  deploy.path          = '/home/afaagb/lixy.tech'
  deploy.build_before  = true # default: false
  # Optional Settings
  # deploy.port  = 5309 # ssh port, default: 22
  # deploy.clean = true # remove orphaned files on remote host, default: false
  # deploy.flags = '-rltgoDvzO --no-p --del' # add custom flags, default: -avz
end

activate :syntax

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end
