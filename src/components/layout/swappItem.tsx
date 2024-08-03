import { listItem } from "@/core/interfaces/listItem.interface";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface SwappItemProps {
  item: listItem;
  children?: React.ReactNode;
  onRemove: (itemId: string) => Promise<void>;
}

export function SwappItem({
  children,
  item,
  onRemove,
  ...props
}: SwappItemProps) {
  const [itemId, setItemId] = useState<string | null>(null);

  // DRAG AND DROP
  const [dragging, setDragging] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [swipeThreshold, setSwipeThreshold] = useState<number>(0);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItemId(item.id.toString());

    const updateSwipeThreshold = () => {
      if (divRef.current) {
        setSwipeThreshold(divRef.current.clientWidth * 0.3); // PORCENT DA DIV
      }
    };

    updateSwipeThreshold();

    window.addEventListener("resize", updateSwipeThreshold);

    return () => window.removeEventListener("resize", updateSwipeThreshold);
  }, [item.id]);

  const handleRightSwipe = () => {
    setRemoved(true);
    setTimeout(() => {
      if (itemId)
        onRemove(itemId).then(() => {
          setRemoved(false);
          setDragging(false);
          setPositionX(0);
        });
    }, 500);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      //console.log("swipado");
      setDragging(true);

      if (eventData.deltaX <= 0) {
        setPositionX(0);
      } else setPositionX(eventData.deltaX);
    },
    onSwipedRight: (eventData) => {
      if (eventData.deltaX >= swipeThreshold) {// TAMANHO EM PIXEL
        handleRightSwipe();
      } else {
        setDragging(false);
        setPositionX(0);
      }
    },
    delta: 10,
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
    touchEventOptions: { passive: true },
  });

  const startThreshold = swipeThreshold * 0.2;
  const customOpacity = Math.min(
    1,
    Math.max(
      0,
      (positionX - startThreshold) / (swipeThreshold - startThreshold)
    )
  );
  return (
    <div className="relative">
      <div
        className={`absolute rounded-lg top-0 left-0 w-full h-full bg-rose-500 flex items-center justify-between 
          ${
            customOpacity === 1
              ? ""
              : "animate-pulse animate-duration-1000 animate-ease-linear "
          }
        `}
        style={{ opacity: customOpacity ? customOpacity : 0 }}
      >
        <i className="bx bx-trash text-white text-xl ml-4"></i>
        <div className="w-7 h-7 border-4 text-white text-sm animate-spin border-gray-200 flex items-center justify-center border-t-white rounded-full mr-5"></div>
      </div>
      <div
        {...handlers}
        ref={divRef}
        className={`sweapleItem rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center justify-between drop-shadow-md 
          ${dragging ? "dragging" : ""} 
          ${removed ? "removing" : ""}`}
        style={{ transform: `translateX(${positionX}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
