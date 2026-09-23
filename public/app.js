const defaultState = { steps: 9847, goal: 10000, credits: 1280, streak: 7 };
const rewards = [
  { title: "COFFEE BREAK", description: "A free regular coffee from a local partner.", cost: 350, symbol: "C", type: "FOOD & DRINK" },
  { title: "MOVE MORE", description: "15% off your next activewear order.", cost: 700, symbol: "M", type: "ACTIVE" },
  { title: "WEEKEND RESET", description: "A guided-walk audio pack for a fresh start.", cost: 950, symbol: "W", type: "WELLNESS" },
];

const load = () => ({ ...defaultState, ...JSON.parse(localStorage.getItem("just-walk-open") || "{}") });
let state = load();
const $ = (selector, root = document) => root.querySelector(selector);
const format = (value) => new Intl.NumberFormat("en-US").format(value);
const progress = () => Math.min(100, (state.steps / state.goal) * 100);
const distance = () => (state.steps / 2050).toFixed(1);
const calories = () => Math.round(state.steps * 0.0418);
const save = () => localStorage.setItem("just-walk-open", JSON.stringify(state));

function setRing(id, value) {
  const ring = $(id);
  ring.style.strokeDashoffset = `${458 - (458 * Math.min(value, 100)) / 100}`;
}

function render() {
  const percent = progress();
  $("#hero-steps").textContent = format(state.steps);
  $("#hero-percent").textContent = `${percent.toFixed(1)}%`;
  $("#hero-distance").firstChild.textContent = distance();
  $("#hero-calories").firstChild.textContent = calories();
  $("#hero-streak").textContent = String(state.streak).padStart(2, "0");
  $("#dashboard-steps").textContent = format(state.steps);
  $("#dashboard-goal").textContent = format(state.goal);
  $("#dashboard-distance").textContent = `${distance()} km`;
  $("#dashboard-calories").textContent = `${calories()} kcal`;
  $("#dashboard-streak").textContent = state.streak;
  $("#credit-total").textContent = format(state.credits);
  $("#goal-input").value = state.goal;
  setRing("#hero-ring", percent);
  setRing("#dashboard-ring", percent);
  renderRewards();
}

function renderRewards() {
  const grid = $("#rewards-grid");
  const template = $("#reward-template");
  grid.replaceChildren(...rewards.map((reward) => {
    const card = template.content.cloneNode(true);
    $(".reward-symbol", card).textContent = reward.symbol;
    $(".reward-type", card).textContent = reward.type;
    $("h3", card).textContent = reward.title;
    $("p", card).textContent = reward.description;
    $(".reward-cost", card).textContent = `${format(reward.cost)} CREDITS`;
    const button = $("button", card);
    button.disabled = state.credits < reward.cost;
    button.textContent = state.credits < reward.cost ? "Not enough credits" : "Redeem ↗";
    button.addEventListener("click", () => {
      state.credits -= reward.cost;
      save();
      render();
    });
    return card;
  }));
}

$("#add-steps").addEventListener("click", () => {
  const wasComplete = state.steps >= state.goal;
  state.steps += 250;
  if (!wasComplete && state.steps >= state.goal) state.credits += Math.round(100 * (state.streak >= 7 ? 1.1 : 1));
  save();
  render();
});

$("#finish-goal").addEventListener("click", () => {
  const wasComplete = state.steps >= state.goal;
  state.steps = state.goal;
  if (!wasComplete) state.credits += Math.round(100 * (state.streak >= 7 ? 1.1 : 1));
  save();
  render();
});

$("#save-goal").addEventListener("click", () => {
  const nextGoal = Number($("#goal-input").value);
  if (Number.isFinite(nextGoal) && nextGoal >= 1000 && nextGoal <= 100000) {
    state.goal = Math.round(nextGoal / 100) * 100;
    save();
    render();
  }
});

$("#reset-data").addEventListener("click", () => {
  state = { ...defaultState };
  save();
  render();
});

$("#year").textContent = new Date().getFullYear();
render();
