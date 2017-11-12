# VSCode Twig Language

Syntax highlighting, Snippets, and PrettyDiff formatting for Twig.

## Installation

Install through VS Code extensions. Search for `Twig Language`

[Visual Studio Code Market Place: Twig Language](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language)

Can also be installed using

```
ext install mblode.twig-language
```

## PrettyDiff code formatter for Twig files

### Using Command Palette (CMD/CTRL + Shift + P)

```
1. CMD + Shift + P -> Format Document
```

### Custom keybindings

If you don't like the defaults, you can rebind `editor.action.formatDocument` in the keyboard shortcuts menu of vscode.

### Format On Save

Respects `editor.formatOnSave` setting.

## Craft CMS/Twig Snippets

### Generic Triggers

```twig

do                {% do ... %}
extends           {% extends 'template' %}
from              {% from 'template' import 'macro' %}
import            {% import 'template' as name %}
importself        {% import _self as name %}
inc, include      {% include 'template' %}
incp              {% include 'template' with params %}
inckv             {% include 'template' with { key: value } %}
use               {% use 'template' %}

autoescape        {% autoescape 'type' %}...{% endautoescape %}
block, blockb     {% block name %} ... {% endblock %}
blockf            {{ block('...') }}
embed             {% embed "template" %}...{% endembed %}
filter, filterb   {% filter name %} ... {% endfilter %}
macro             {% macro name(params) %}...{% endmacro %}
set, setb         {% set var = value %}
spaceless         {% spaceless %}...{% endspaceless %}
verbatim          {% verbatim %}...{% endverbatim %}

if, ifb           {% if condition %} ... {% endif %}
ife               {% if condition %} ... {% else %} ... {% endif %}
for               {% for item in seq %} ... {% endfor %}
fore              {% for item in seq %} ... {% else %} ... {% endfor %}

else              {% else %}
endif             {% endif %}
endfor            {% endfor %}
endset            {% endset %}
endblock          {% endblock %}
endfilter         {% endfilter %}
endautoescape     {% endautoescape %}
endembed          {% endembed %}
endfilter         {% endfilter %}
endmacro          {% endmacro %}
endspaceless      {% endspaceless %}
endverbatim       {% endverbatim %}
```

### Craft Triggers

```twig
asset                    craft.assets.first()
assets, assetso          craft.assets loop
categories, categorieso  craft.categories loop
entries, entrieso        craft.entries loop
feed                     craft.feeds.getFeedItems loop
t                        |t
replace                  |replace('search', 'replace')
replacex                 |replace('/(search)/i', 'replace')
split                    |split('\n')
tags, tagso              craft.tags loop
users, userso            craft.users loop

cache                    {% cache %}...{% endcache %}
children                 {% children %}
exit                     {% exit 404 %}
ifchildren               {% ifchildren %}...{% endifchildren %}
includecss               {% includecss %}...{% endincludecss %}
includecssfile           {% includeCssFile "/resources/css/global.css" %}
includehirescss          {% includehirescss %}...{% endincludehirescss %}
includejs                {% includejs %}...{% endincludejs %}
includejsfile            {% includeJsFile "/resources/js/global.js" %}
matrix, matrixif         Basic Matrix field loop using if statements
matrixifelse             Basic Matrix field loop using if/elseif
matrixswitch             Basic Matrix field loop using switch
nav                      {% nav item in items %}...{% endnav %}
paginate                 Outputs example of pagination and prev/next links
redirect                 {% redirect 'login' %}
requirelogin             {% requireLogin %}
requirepermission        {% requirePermission "spendTheNight" %}
switch                   {% switch variable %}...{% endswitch %}

csrf                     {{ getCsrfInput() }}
getfoothtml              {{ getFootHtml() }}
getheadhtml              {{ getHeadHtml() }}

getparam                 craft.request.getParam()
getpost                  craft.request.getPost()
getquery                 craft.request.getQuery()
getsegment               craft.request.getSegment()

case                     {% case "value" %}
endcache                 {% endcache %}
endifchildren            {% endifchildren %}
endincludecss            {% endincludecss %}
endincludehirescss       {% endincludehirescss %}
endincludejs             {% endincludejs %}
endnav                   {% endnav %}

ceil                     ceil()
floor                    floor()
max                      max()
min                      min()
round                    round()
shuffle                  shuffle()
random                   random()
url, urla                url('path'), url('path', params, 'http', false)

rss                      Example rss feed

dd                      <pre>{{ dump() }}</pre>{% exit %}
dump                    <pre>{{ dump() }}</pre>
```

### Example Forms

```
formlogin                Example login form
formuserprofile          Example user profile form
formuserregistration     Example user registration form
formforgotpassword       Example forgot password form
formsetpassword          Example set password form
formsearch               Example search form
formsearchresults        Example search form results
```

## Twig syntax highlighting

An extension for VS Code which provides support for the Twig syntax.

### Optional VSCode Config

Optionally add the following code to your VSCode user settings so that every *.html file is recognised as the Twig language mode.

```
"files.associations": {
    "*.html": "twig"
},
```

## Contribute

Feel free to open issues or Pull Requests!

### Running extension

- Open this repository inside VSCode
- `yarn install` or `npm install` in your terminal
- Debug sidebar
- `Launch Extension`

## License

MIT © [Matthew Blode](https://matthewblode.com)
