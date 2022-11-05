import { type NextPage } from "next";
import { useEffect, useState } from "react";
import anime from "../../node_modules/animejs/lib/anime.es.js";

const Home: NextPage = () => {
  const [toggled, setToggled] = useState(true);
  console.log(toggled);

  return (
    <div>
      {toggled && 
        <div className="flex h-screen w-screen flex-wrap content-center justify-center">
          {Block({ toggled, setToggled })}
        </div>
      }
      {!toggled && (
        <div className="flex h-screen w-screen flex-wrap content-center justify-center text-black">
          Hello
        </div>
      )}
    </div>
  );
};

export default Home;

const Block = (props: {
  setToggled: (a: boolean) => void;
  toggled: boolean;
}) => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    setColumns(Math.floor(document.body.clientWidth / 121));
    setRows(Math.floor(document.body.clientHeight / 121));
  }, [columns, rows]);

  const animateBlock = async (index: number) => {
    await anime({
      targets: ".block",
      opacity: props.toggled ? 1 : 0,
      backgroundColor: "rgb(23, 23, 23)",
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index,
      }),
    });

    if (props.toggled) {
      props.setToggled(!props.toggled);
    }
  };

  const indents = [];
  for (let i = 0; i < columns * rows; i++) {
    indents.push(
      <div
        key={i}
        onClick={() => animateBlock(i)}
        className="m-2 block h-28 w-28 rounded bg-red-400"
      ></div>
    );
  }

  return indents;
};
