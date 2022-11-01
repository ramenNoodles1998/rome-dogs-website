import { type NextPage } from "next";
import { useEffect, useState } from "react";
import anime from "../../node_modules/animejs/lib/anime.es.js";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-wrap content-center justify-center">
      {Block()}
    </div>
  );
};

export default Home;

const Block = () => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [toggled, setToggled] = useState(true);

  useEffect(() => {
    setColumns(Math.floor(document.body.clientWidth / 121));
    setRows(Math.floor(document.body.clientHeight / 121));
  }, [columns, rows]);

  const animateBlock = (index: number) => {
    if (toggled) {
      setToggled(!toggled);
    }

    anime({
      targets: ".block",
      opacity: toggled ? 1 : 0,
      backgroundColor: "rgb(23, 23, 23)",
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index,
      }),
    });
  };

  const indents = [];
  for (let i = 0; i < columns * rows; i++) {
    indents.push(
      <div
        key={i}
        onClick={() => animateBlock(i)}
        className="m-2 h-28 w-28 rounded bg-red-400 block"
      ></div>
    );
  }

  return indents;
};
