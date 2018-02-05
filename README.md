# Portfolio Website
A website designed to act as my personal portfolio ( www.sabrinavoth.ca )

Sabrina Voth
January, 2018

Built with bootstrap in mind, it's essentially 3 items:

# 1) Sabrina Voth (My Big Fat Name)

It's my portfolio site, so boom. No confusion when you visit the page.

# 2) Tag Field

This is a collection of tags, initially *all* the tags for all my "projects"
(unless the url contains a tags= search query, then filters those tags). Once a single
tag is clicked, it filters based on that tag. However, the tag field also is filtered
and populated with all the tags of the projects shown. In this way, you can keep clicking
tags until you find the minimum amount/most shared connections.

The way it does this is really simple, and described below.

# 3) Project field

In the case of my portfolio, I wanted to represent me. The best way to do that
is to show every creation that I feel represents my who I am, and what I want to
be saying. Therefore, the Project Field is just a big collection of bits and bobs,
all pulled from a json file.

Each Project has an associated type, such as link or photograph, that is used
to generate the appropriate card. In this way, I can expand the types of projects
as needed, but I also have general formats that I never need to change.

# How it all comes together

The site is simple: on load, it pulls up the json file and starts reading off
the projects. Depending on what filetype they are, it will generate an appropriate card,
and slip it into the Project Field IF it doesn't match any filters currently set.
Then, it checks the tags of the project it just displayed,
and adds any new ones to the Tag Field.

Whenever a tag is clicked, it simply dumps the Project Field and the Tag Field out and regenerates the
page, re-running the same code but with that tag as a filter. And that's it!
