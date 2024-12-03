const hrPerWeek = 24 * 7;
let taskList = [];

const handleOnSubmit = (e) => {
  // const elm = document.getElementById("task");
  // console.log(elm.value);

  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hours = +newForm.get("hours");
  console.log(task, hours);

  const obj = {
    task,
    hours,
    id: randomIdGnerator(),
    type: "entry",
  };

  const existingHrs = taskTotal();

  if (existingHrs + hours > hrPerWeek) {
    return alert("Sorry, you are out of hours");
  }

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";
  const entryElm = document.getElementById("entryList");

  const entryList = taskList.filter((item) => item.type === "entry");

  entryList.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hours}</td>
                  <td class="text-end">
                    <button onclick = "handleOnDelete('${
                      item.id
                    }')" class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button onclick="switchTask('${
                      item.id
                    }','bad')"  class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });

  entryElm.innerHTML = str;
  taskTotal();
};
const displayBadList = () => {
  let str = "";
  const badElm = document.getElementById("badlist");

  const badList = taskList.filter((item) => item.type === "bad");

  badList.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hours}</td>
                  <td class="text-end">
                    <button onclick = "handleOnDelete('${
                      item.id
                    }')" class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button onclick="switchTask('${
                      item.id
                    }','entry')"  class="btn btn-warning">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                  </td>
                </tr>`;
  });

  badElm.innerHTML = str;
  document.getElementById("savedhours").innerText = badList.reduce(
    (acc, item) => acc + item.hours,
    0
  );
};

const randomIdGnerator = (length = 6) => {
  const str = "qwertyuioplkjhgfdsazxxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);

    id += str[randomIndex];
  }
  return id;
};

const handleOnDelete = (id) => {
  if (window.confirm("Do you want to delete this ?")) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
    displayBadList();
  }
};

const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }

    return item;
  });

  displayEntryList();
  displayBadList();
};

const taskTotal = () => {
  const totalHrs = taskList.reduce((acc, item) => {
    return acc + item.hours;
  }, 0);
  document.getElementById("ttl").innerText = totalHrs;
  return totalHrs;
};
