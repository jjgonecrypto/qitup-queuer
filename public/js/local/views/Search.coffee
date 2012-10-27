define ["Backbone", "underscore", "text!./search.html", "eventbus"], (Backbone, _, viewTemplate, bus) ->
  timeout = undefined

  Backbone.View.extend
    initialize: ->
      @lastQuery = undefined
      @entries = @options.entries

    render: ->
      @$el.html viewTemplate
      @  

    search: (evt) ->
      console.log "searching..."

      return if @$(evt.target).val().length < 3 or @lastQuery is @$(evt.target).val()

      query = @$(evt.target).serialize()

      @$('.loading').show()

      @lastQuery = @$(evt.target).val() 
      bus.trigger "search:query", @lastQuery 

      @entries.loadBy query, () => @$('.loading').hide()
      
    keyup: (evt) ->
      clearTimeout(timeout) if timeout
      timeout = setTimeout () =>
        @search(evt) 
      , 500

    events: 
      'keyup .spotify-lookup': 'keyup'
      'change .spotify-lookup': 'search'