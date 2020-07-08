const personInfo = {
  gender: "female",
  weight: null,
  height: null,
  age: null,
  trainPerWeek: "1perWeek",
  intensity: "level1",
  bodyType: "type1",
  trainingDuration: null,
  error: false,
};

$(".submit").click(function () {
  console.log(personInfo);
  if (
    $(".weight").val().length ||
    $(".duration").val().length ||
    $(".height").val().length ||
    $(".age").val().length
  ) {
    personInfo.error = false;
    personInfo.weight = $(".weight").val();
    personInfo.trainingDuration = $(".duration").val();
    personInfo.height = $(".height").val();
    personInfo.age = $(".age").val();
  } else {
    personInfo.error = true;
  }
  $(".modal-body").text(function () {
    if (personInfo.error) {
      return "uzupełnij brakujące informacje";
    } else {
      return `${calculate()}`;
    }
  });
});

function getClasses(selector, number) {
  const classes = [];
  for (let i = 0; i < $(selector).children().length; i++) {
    classes.push($(selector).children()[i].classList[number]);
  }
  console.log(classes);
  return classes;
}
function setListener(selector, number, stateName) {
  const Listener = getClasses(selector, number);
  switch (stateName) {
    case "trainPerWeek":
      Listener.forEach((element) => {
        $(`.${element}`).click(function () {
          personInfo.trainPerWeek = element;
        });
      });
      break;
    case "bodyType":
      Listener.forEach((element) => {
        $(`.${element}`).click(function () {
          personInfo.bodyType = element;
        });
      });
      break;
    case "intensity":
      Listener.forEach((element) => {
        $(`.${element}`).click(function () {
          personInfo.intensity = element;
        });
      });
      break;
  }
  Listener.forEach((element) => {
    $(`.${element}`).click(function () {
      console.log(stateName);
    });
  });
}

setListener("div.train > div", 1, "trainPerWeek");
setListener("div.intensity > div", 1, "intensity");
setListener("div.bodyType > div", 1, "bodyType");

$("#female").click(function () {
  personInfo.gender = "female";
});
$("#male").click(function () {
  personInfo.gender = "male";
});
function calculate() {
  const {
    gender,
    weight,
    height,
    age,
    trainPerWeek,
    intensity,
    bodyType,
    trainingDuration,
  } = personInfo;

  const BMR =
    gender === "female"
      ? 9.99 * weight + 6.25 * height - 4.92 * age - 161
      : 9.99 * weight + 6.25 * height - 4.92 * age + 5;
  const TEA =
    ((2.5 * intensity.split("").reverse()[0] + 2.5) *
      trainingDuration *
      trainPerWeek.split("")[0]) /
    7;

  const NEAT = 800 - 200 * bodyType.split("").reverse()[0];
  const sum = BMR + TEA + NEAT;
  const kcal = Math.round(sum * 1.1);
  return kcal;
}
