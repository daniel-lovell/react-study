function Clicker(mountPoint, props) {
  console.log("Clicker" + props.id);
  const state = {
    count: 0,
    eventElement: null
  };

  function setState(newState) {
    Object.assign(state, newState);
    render();
  }

  function handleClick(e) {
    setState({ count: state.count + 1, eventElement: e.target.id });
  }

  function render() {
    console.log("clicker" + props.id);
    document.getElementById(mountPoint).innerHTML = `
        <div>Clicker ${props.id}</div>
        <div>Clicks: ${state.count}</div>
        <button id=${props.id}>Click Me!</button>
    `;
    document.getElementById(props.id).addEventListener("click", handleClick);
    if (state.eventElement) {
      document.getElementById(state.eventElement).focus();
    }
  }

  return render;
}

function App(mountPoint) {
  console.log("App");

  const clickerA = Clicker("clickerA", { id: "A" });
  const clickerB = Clicker("clickerB", { id: "B" });

  function render() {
    console.log("app");
    document.getElementById(mountPoint).innerHTML = `
        <div>Daniel's Clickers</div>
        <div id=clickerA></div>
        <div id=clickerB></div>
    `;
    clickerA();
    clickerB();
  }

  return render;
}

const app = App("root");

function render() {
  console.log("render");
  app();
}

render();
