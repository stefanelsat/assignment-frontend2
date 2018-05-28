const choo = require('choo')
const html = require('choo/html')
//const emoji = require('node-emoji')
const css = require('sheetify')
const app = choo()
css('bootstrap')

document.title = "🚂 Choo Choo!"
const styles = css`
  body {
    text-align: center;
  }
  h1 {
    padding: 0.5em;
  }
  .track {
    padding: 0 0.5em;
    width: 100%;
    font-size: 3em;
  }
  .sign {
    font-size: 0.5em;
    text-align: left;
  }
  select {
    margin: 1em;
  }
`
const lok = "🚂"
const wagon = "🚃"
const tracks = 
  {
    track1: [],
    track2: []
  }

const alertWrapper = (type, text) => {
  return html `<div class="alert alert-${type}" role="alert"><b>Last message:</b> ${text}</div>`
}
const updateSelection = (selected) => {
  //const scheduleSelection = document.getElementById('schedule-selector')
  console.log(scheduleSelection)
  //let index = scheduleSelection.options.find((option) => {return option.value === selected})
  console.log(index)
}

app.model({
  state: { 
    title: 'Choo choo!',
    loks: [lok, lok, lok, lok],
    wagons: [],
    tracks: {
      track1: [],
      track2: []
    },
    track1: tracks.track1,
    track2: tracks.track2,
    scheduledTrack: "--",
    message: ""
  },
  reducers: {
    addTrain: 
    (data, state) => 
    { 
      const train = []
      if(state.wagons.length > 0) {
        if(state.wagons.length <= 10) {
          train.push(wagon)
        }
        else {
          let infoText = "Warning: You can not add more than 10 wagons to a train."
          var notice = alertWrapper("warning", infoText)
        }

      }
      if((state.wagons.length === 0)&&(state.loks.length > 0)) {
        if(state.loks.length > 0) {
          state.loks.pop()
          train.push(lok)
        }

      }

      return Object.assign(state, {
        loks: state.loks,
        wagons: [...state.wagons, ...train],
        message: notice
      })
    },
    moveTo:
    (data, state) =>
    {
      if(state.wagons.length > 0) {
        let curTrack = []
        let infoText = "Successfully dispatched train to " + data.toUpperCase() + "!"
        let notice = alertWrapper("success", infoText)
  
        if(data === "track1") {
          if(state.track1.length === 0) {
            curTrack = state.wagons
            state.wagons = []
          }
          return Object.assign(state, {
            track1: [...state.track1, ...curTrack],
            message: notice
          })
        }
        if(data === "track2") {
          if(state.track2.length === 0) {
            curTrack = state.wagons
            state.wagons = []
          }
          return Object.assign(state, {
            track2: [...state.track2, ...curTrack],
            message: notice
          })
        }
      } 
    },
    setSchedule:
    (data, state) =>
    {
      return Object.assign(state, {
        scheduledTrack: data
      })
    },
    schedule:
    (data, state) =>
    {
      let infoText = "Successfully scheduled " + state.scheduledTrack.toUpperCase() + "!"
      let notice = alertWrapper("success", infoText)
      
      if(state.scheduledTrack === "track1" && state.track1.length > 0 ) {
        return Object.assign(state, {
          message: notice,
          track1: [],
          scheduledTrack: "--"
        })
      }
      if(state.scheduledTrack === "track2" && state.track2.length > 0) {
        return Object.assign(state, {
          message: notice,
          track2: [],
          scheduledTrack: "--"
        })
      }
    
    }
  }
})

const mainView = (state, prev, send) => html`
  <main>
    <h1>${state.title}</h1>
    <div id="alert-box">
    ${state.message}
    </div>
    <div id="lok-pool" class="track">
    ${state.loks.map((lok) => lok)}
    </div>
    <div id="rangier-pool" class="track">
      <p class="sign">POOL</sign>
      ${state.wagons.map((wagon) => wagon)}
    </div>
    
    <div class="track">
      <p class="sign">TRACK 1</sign>
      ${state.track1.map((train) => train)}
    </div>
    <div class="track">
      <p class="sign">TRACK 2</sign>
      ${state.track2.map((train) => train)}
    </div>

    <div class="control-center">
      <button id="add" onclick=${() =>
        send('addTrain')}
        class="btn btn-primary">➕ Add wagon to pool</button><br>
      <select onchange=${(e) =>
        send('setSchedule', e.target.value)}
        id="schedule-selector" class="custom-select w-50">
        <option ${state.scheduledTrack === "--" ? "selected" : ""}>Select a track</option>
        <option value="track1" ${state.scheduledTrack === "track1" ? "selected" : ""}>1️</option>
        <option value="track2" ${state.scheduledTrack === "track2" ? "selected" : ""}>2️️</option>
      </select><br>
      <button id="track1" onclick=${() =>
        send('moveTo', state.scheduledTrack)}
      class="btn btn-secondary" ${state.scheduledTrack === "--" ? "disabled" : ""}>Dispatch to ${state.scheduledTrack.toUpperCase()}</button>
      <button onclick=${() =>
        send('schedule')}
        class="btn btn-success" ${state.scheduledTrack === "--" ? "disabled" : ""}>Schedule ${state.scheduledTrack.toUpperCase()} !</button>
    </div>

  </main>
`

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)