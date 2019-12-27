# aframe-play-sound-on-event

This is a component for AFRAME which allows events to trigger sounds. 

The 'event' property specifies the event which triggers sound. The default is `click`.   
The 'type' property specifies the semantics The default is `one-shot`:

* `type="play-only"` - When the event is triggered, `playSound()` will be called on the sound component.   
* `type="one-shot"` - When the event is triggered, `stopSound()` then `playSound()` will be called on the sound component.   
* `type="toggle-pause"` - When the event is triggered, `playSound()` will be called if the sound is stopped or paused, `pauseSound()` will be called if the sound is playing.   
* `type="toggle-stop"` - When the event is triggered, `playSound()` will be called if the sound is stopped or paused, `stopSound()` will be called if the sound is playing.   

Calling `pause()` on this component will disable remove listeners, effectively disabling the functionality of this component. It will not directly pause audio.   
Calling `play()` will recreate listeners if `pause()` has been called previously. Otherwise this will do nothing.