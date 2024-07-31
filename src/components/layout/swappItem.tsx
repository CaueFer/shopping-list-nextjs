import { listItem } from "@/core/interfaces/listItem.interface";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface SwappItemProps {
  item: listItem;
  children?: React.ReactNode;
}

export function SwappItem({ children, item, ...props }: SwappItemProps) {
  // DRAG AND DROP
  const [dragging, setDragging] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [positionX, setPositionX] = useState(0);

  const handleRightSwipe = () => {
    console.log("swipei", item.id);

    //document.getElementById(item.id).classList.add("removing");
    setRemoved(true);
    setTimeout(() => {
      console.log("deletei");
      // Lógica para excluir o item (por exemplo, atualizar o estado ou chamar uma API)
    }, 500);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setDragging(true);

      if (eventData.deltaX <= 0) {
        setPositionX(0);
      } else setPositionX(eventData.deltaX);
    },
    onSwipedRight: (eventData) => {
      if (eventData.deltaX >= 250) {
        handleRightSwipe();
      } else {
        setDragging(false);
        setPositionX(0);
      }
    },
    delta: 10,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div
      {...handlers}
      key={item.id}
      className={`sweapleItem rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center justify-between drop-shadow-md 
          ${dragging ? "dragging" : ""} 
          ${removed ? "removing" : ""}`}
      style={{ transform: `translateX(${positionX}px)` }}
    >
      {children}
    </div>
  );
}
