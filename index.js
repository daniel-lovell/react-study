function clicker(mountPoint, props) {
  console.log("clicker " + props.id);
  const state = {
    count: 0
  };

  function setState(newState) {
    Object.assign(state, newState);
    renderClicker();
  }

  function handleClick() {
    setState({ count: state.count + 1 });
  }

  function renderClicker() {
    console.log("renderClicker" + props.id);
    document.getElementById(mountPoint).innerHTML = `
            <div>Clicker ${props.id}</div>
            <div>Clicks: ${state.count}</div>
            <button id=${props.id}>Click Me!</button>
        `;
    document.getElementById(props.id).addEventListener("click", handleClick);
  }

  return renderClicker;
}

function app(mountPoint) {
  console.log("app");

  const renderClicker1 = clicker("clicker1", { id: "1" });
  const renderClicker2 = clicker("clicker2", { id: "2" });

  function renderApp() {
    console.log("renderApp");
    document.getElementById(mountPoint).innerHTML = `
            <div>Daniel's Clickers</div>
            <div id=clicker1></div>
            <div id=clicker2></div>
        `;
    renderClicker1();
    renderClicker2();
  }

  return renderApp;
}

const renderApp = app("root");

function render() {
  console.log("render");
  renderApp();
}

render();
