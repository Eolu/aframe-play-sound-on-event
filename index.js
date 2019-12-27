/* global AFRAME */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * A component which plays sound on an event. Accepts the following modes:
 * @property mode Accepts the following strings:
 *                'one-shot' plays audio from the beginning when play is pressed
 *                'play-only' same as one-shot, but doesn't interrupt audio if playing
 *                'toggle-pause' Plays and pauses with click
 *                'toggle-stop' Plays and stops with click
 * @property event The event type which will trigger sound to play.
 */
AFRAME.registerComponent('play-sound-on-event', 
{
    dependencies: ['sound'],
    schema: 
    {
        mode: {type: 'string', default: 'one-shot'},
        event: {type: 'string', default: 'click'}
    },
    play: function ()
    {
        if (this.soundPlaying)
        {
            this.el.components.sound.playSound();
        }
    },
    pause: function ()
    {
        if (this.soundPlaying)
        {
            this.el.components.sound.pauseSound();
        }
    },
    update: function (oldData) 
    {
        this.remove();
        this.soundPlaying = this.el.components.sound.autoplay;
        switch(this.data.mode) 
        {
        case 'one-shot':
            this.eventTriggered = () =>
            {
                this.el.components.sound.stopSound();
                this.el.components.sound.playSound();
            };
            break;
        case 'play-only':
            this.eventTriggered = this.el.components.sound.playSound;
            break;
        case 'toggle-pause':
            this.eventTriggered = () =>
            {
                if (this.soundPlaying)
                {
                    this.el.components.sound.pauseSound();
                    this.soundPlaying = false;
                }
                else
                {
                    this.el.components.sound.playSound();
                    this.soundPlaying = true;
                }
            };
            this.soundEnded = () => this.soundPlaying = false;
            this.el.addEventListener("sound-ended", this.soundEnded);
            break;
        case 'toggle-stop':
            this.eventTriggered = () =>
            {
                if (this.soundPlaying)
                {
                    this.el.components.sound.stopSound();
                    this.soundPlaying = false;
                }
                else
                {
                    this.el.components.sound.playSound();
                    this.soundPlaying = true;
                }
            };
            this.soundEnded = () => this.soundPlaying = false;
            this.el.addEventListener("sound-ended", this.soundEnded);
            break;
        default:
            throw "Invalid mode: " + this.data.mode;
        }
        this.el.addEventListener(this.data.event, this.eventTriggered); 
    },
    remove: function () 
    { 
        this.el.removeEventListener(this.data.event, this.eventTriggered);
        this.el.removeEventListener("sound-ended", this.soundEnded);
    }
});