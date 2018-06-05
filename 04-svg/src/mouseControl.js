function registerTrackPos(handle) {
  // TODO: add touchmove eventListener for support on mobile devices
  $(handle.currentTarget).mousemove((mouseEvent) => {
    let commitBtn = $('#commit-btn > .fg-rect')
    let commitArrow = $('#commit-btn > .link-text')
    if(mouseEvent.clientX >= commitBtn.attr('width') && mouseEvent.clientX <= $('.bg-rect').attr('width')) {
      commitBtn.attr('width', mouseEvent.clientX)
      commitArrow.attr('x', mouseEvent.clientX - 50)
      if(parseInt(commitBtn.attr('width')) >= parseInt($('.bg-rect').attr('width'))-2) {
        $('#commited-text').fadeIn()
        commitBtn.attr('width', $('.bg-rect').attr('width'))
      }
    }

  })
}
// TODO: unbind touchmove evtListener 
function unregisterTrackPos(handle) {
  $(handle.currentTarget).unbind('mousemove')
}

export {registerTrackPos, unregisterTrackPos}
