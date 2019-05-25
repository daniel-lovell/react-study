// Todo: Lists, Conditional Rendering

function TodoItem() {
  console.log("TodoListApp");

  const state = {
    done: false,
    eventElement: null
  };

  function setState(state, newState, mountPoint, props) {
    Object.assign(state, newState);
    render(mountPoint, props);
  }

  function render(mountPoint, props) {
    console.log("todoItem", mountPoint);

    function handleClick(e) {
      setState(
        state,
        { done: !state.done, eventElement: e.target.id },
        mountPoint,
        props
      );
    }

    document.getElementById(mountPoint).innerHTML = `
      <input id=${mountPoint + "Done"} type="checkbox" ${
      state.done ? "checked" : ""
    }>${props.item}
    `;
    document
      .getElementById(mountPoint + "Done")
      .addEventListener("click", handleClick);
    if (state.eventElement) {
      document.getElementById(state.eventElement).focus();
    }
  }

  return render;
}

function TodoListApp(mountPoint) {
  console.log("TodoListApp");

  const todoItem = TodoItem("todoItem");

  let list = ["Go to store", "Go to bed", "Eat dinner"];

  function render(props) {
    console.log("todoListApp");

    document.getElementById(mountPoint).innerHTML = `
      <ul>${list
        .map((_item, index) => `<li id=${mountPoint + index}></li>`)
        .reduce((accum, curr) => accum + curr)}
      </ul>
    `;
    list.forEach((item, index) => todoItem(mountPoint + index, { item: item }));
  }

  return render;
}

function ClickerLifted(mountPoint, props) {
  console.log("ClickerLifted" + props.id);

  function render(props) {
    console.log("clickerLifted" + props.id);

    function handleClick() {
      props.handleClick(props.id);
    }
    document.getElementById(mountPoint).innerHTML = `
        <div>Clicker ${props.id}</div>
        <div>Clicks: ${props.count}</div>
        <button id=${props.id}>Click Me!</button>
    `;
    document.getElementById(props.id).addEventListener("click", handleClick);
    // if (state.eventElement) {
    //   document.getElementById(state.eventElement).focus();
    // }
  }

  return render;
}

function ClickerLiftedApp(mountPoint) {
  console.log("ClickerLiftedApp");
  const state = {
    count: { A: 0, B: 0 }
  };

  function setState(state, newState) {
    Object.assign(state, newState);
    render();
  }

  function handleClick(id) {
    setState(state.count, { [id]: state.count[id] + 1 });
  }

  const clickerLiftedA = ClickerLifted("clickerLiftedA", {
    id: "A"
    // count: state.count.A,
    // handleClick: handleClick
  });
  const clickerLiftedB = ClickerLifted("clickerLiftedB", {
    id: "B"
    // count: state.count.B,
    // handleClick: handleClick
  });

  function render(props) {
    console.log("clickerLiftedApp");
    document.getElementById(mountPoint).innerHTML = `
        <div>Clickers - Lifted State - Total: <span>${state.count.A +
          state.count.B}</span></div>
        <div id=clickerLiftedA></div>
        <div id=clickerLiftedB></div>
    `;
    clickerLiftedA({
      id: "A",
      count: state.count.A,
      handleClick: handleClick
    });
    clickerLiftedB({
      id: "B",
      count: state.count.B,
      handleClick: handleClick
    });
  }

  return render;
}

function ClickerIndividual(mountPoint, props) {
  console.log("ClickerIndividual" + props.id);
  const state = {
    count: 0,
    eventElement: null
  };

  function setState(state, newState, props) {
    Object.assign(state, newState);
    render(props);
  }

  function render(props) {
    console.log("clickerIndividual" + props.id);
    function handleClick(e) {
      setState(
        state,
        { count: state.count + 1, eventElement: e.target.id },
        props
      );
    }
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

function ClickerIndividualApp(mountPoint) {
  console.log("ClickerIndividualApp");

  const clickerIndividualA = ClickerIndividual("clickerIndividualA", {
    id: "individualA"
  });
  const clickerIndividualB = ClickerIndividual("clickerIndividualB", {
    id: "individualB"
  });

  function render(props) {
    console.log("clickerIndividualApp");
    document.getElementById(mountPoint).innerHTML = `
        <div>Clickers - Individual State</div>
        <div id=clickerIndividualA></div>
        <div id=clickerIndividualB></div>
    `;
    clickerIndividualA({
      id: "individualA"
    });
    clickerIndividualB({
      id: "individualB"
    });
  }

  return render;
}

function App(mountPoint) {
  console.log("App");

  const clickerIndividualApp = ClickerIndividualApp("clickerIndividualApp");
  const clickerLiftedApp = ClickerLiftedApp("clickerLiftedApp");
  const todoListApp = TodoListApp("todoListApp");

  function render(props) {
    console.log("app");
    document.getElementById(mountPoint).innerHTML = `
      <div id="clickerIndividualApp"></div>
      <hr />
      <div id="clickerLiftedApp"></div>
      <hr />
      <div id="todoListApp"></div>
    `;
    clickerIndividualApp();
    clickerLiftedApp();
    todoListApp();
  }

  return render;
}

const app = App("app");

function render() {
  console.log("render");
  app();
}

render();
