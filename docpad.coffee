# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
    # ...
    srcPath: 'web'  # default

    outPath: './build/web'  # default

    templateData:

        # Specify some site properties
        site:

            # Here are some old site urls that you would like to redirect from
            oldUrls: [
            ]

            # The default title of our website
            title: "QTime"

            # The website description (for SEO)
            description: """
                QTime
                """

            # The website keywords (for SEO) separated by commas
            keywords: """
                qtime
                """

            # The website's styles
            styles: [
                'material.min.css'
            ]

            # The website's scripts
            scripts: [
                'material.min.js'
            ]
        # -----------------------------
        # Helper Functions
        getUrl: (document) ->
            return @site.url + (document.url or document.get?('url'))

        # Get the prepared site/document title
        # Often we would like to specify particular formatting to our page's title
        # we can apply that formatting here
        getPreparedTitle: ->
            # if we have a document title, then we should use that and suffix the site's title onto it
            if @document.title
                "#{@document.title} | #{@site.title}"
            # if our document does not have it's own title, then we should just use the site's title
            else
                @site.title

        getSiteTitle: ->
            @site.title

        # Get the prepared site/document description
        getPreparedDescription: ->
            # if we have a document description, then we should use that, otherwise use the site's description
            @document.description or @document.lead or @site.description

        # Get the prepared site/document keywords
        getPreparedKeywords: ->
            # Merge the document keywords with the site keywords
            @site.keywords.concat(@document.keywords or []).join(', ')
}

# Export the DocPad Configuration
module.exports = docpadConfig