export default function Combat({ dispatch, endGame }) {
  function attack() {
    dispatch({ type: "GAIN_XP", amount: 10 });
    if (Math.random() < 0.3) {
      dispatch({ type: "DAMAGE", amount: 40 });
      endGame();
    }
  }

  return (
    <>
      <p>A monster attacks!</p>
      <button onClick={attack}>Attack</button>
      <button onClick={() => dispatch({ type: "TRAVEL", to: "town" })}>
        Run
      </button>
    </>
  );
}
