function clicker(render, mountPoint, id) {
  console.log("clicker " + id);
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
    console.log("renderClicker" + id);
    document.getElementById(mountPoint).innerHTML = `
            <div>Clicker ${id}</div>
            <div>Clicks: ${state.count}</div>
            <button id=${id}>Click Me!</button>
        `;
    document.getElementById(id).addEventListener("click", handleClick);
  }

  return renderClicker;
}

function app(render, mountPoint) {
  console.log("app");

  const renderClicker1 = clicker(renderApp, "clicker1", "1");
  const renderClicker2 = clicker(renderApp, "clicker2", "2");

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

const renderApp = app(render, "root");

function render() {
  console.log("render");
  renderApp();
}

render();