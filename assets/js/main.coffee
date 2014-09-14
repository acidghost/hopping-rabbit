jQuery(document).ready(($) ->
  spectrum = () ->
    colors = [
      'rgb(256,0,0)',     #red
      'rgb(0,256,0)',     #green
      'rgb(0,0,256)',     #blue
      'rgb(256,256,0)',   #orange
      'rgb(256,0,256)',   #magenta
      'rgb(0,256,256)']   #cyan
    #hue1 = colors[(Math.floor(Math.random() * colors.length))]
    hue2 = colors[(Math.floor Math.random() * colors.length)]

    #$('.jumbotron').css('color', hue1)
    $('body').css 'background-color', hue2

  spectrum()
  window.setInterval(spectrum, 1000)

  $('#generate-chart').on('click', (e) ->
    e.preventDefault
    #console.log 'from submitted', $('#username').val(), $('#reponame').val(), $('#charttype').val()
    username = $('#username').val()
    reponame = $('#reponame').val()
    charttype = $('#charttype').val()
    url = window.location+'charts/'+charttype+'/'+username+'/'+reponame
    chartSect = $('#chart-section')
    chartSect.find('#chart-url').html('<a href="'+url+'" target="_blank">'+url+'</a>')
    iframeCode = '<iframe src="'+url+'"></iframe>';
    chartSect.find('#chart-code').text(iframeCode);
    chartSect.find('#chart-viz').html('<iframe src="'+url+'"></iframe>')

    chartSect.css 'display', 'block'
  )
)