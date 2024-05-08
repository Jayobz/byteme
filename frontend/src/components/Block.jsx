import React, { useEffect, useRef } from 'react';

const Block = () => {

    const blockContainer = useRef(null);

    useEffect(() => {
        if (blockContainer.current) {
            createBlocks();
        }
    }, []);

    const createBlocks = () => {
        const blockSize = 50;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const numCols = Math.ceil(screenWidth / blockSize);
        const numRows = Math.ceil(screenHeight / blockSize);
        const numBlocks = numCols * numRows;

        for (let index = 0; index < numBlocks; index++) {
            const block = document.createElement("div");
            block.classList.add("blockComp");
            block.dataset.index = index;
            block.addEventListener('mousemove', highlightRandomNeighbors);
            blockContainer.current.appendChild(block);
        }
    }

    const highlightRandomNeighbors = (event) => {
        const i = parseInt(event.target.dataset.index);
        const numCols = Math.ceil(window.innerWidth / 50);
        const numRows = Math.ceil(window.innerHeight / 50);
        const numBlocks = numCols * numRows;
        const neighbors = [
            i - 1,
            i + 1,
            i - numCols,
            i + numCols,
            i - numCols - 1,
            i - numCols + 1,
            i + numCols + 1,
        ].filter((x) => 
            x >= 0 &&
            x < numBlocks &&
            Math.abs((x % numCols) - (i % numCols)) <= 1
        );

        event.target.classList.add("highlight");
        setTimeout(() => {
            event.target.classList.remove("highlight");
        }, 500);

        shuffleArray(neighbors)
            .slice(0, 1)
            .forEach((nIndex) => {
                const neighbor = blockContainer.current.children[nIndex];
                if (neighbor) {
                    neighbor.classList.add("highlight");
                    setTimeout(() => {
                        neighbor.classList.remove("highlight");
                    }, 500);
                }
            });
    };

    const shuffleArray = (array) => {
        for (let index = array.length - 1; index > 0; index--) {
            const j = Math.floor(Math.random() * (index + 1));
            [array[index], array[j]] = [array[j], array[index]];
        }
        return array;
    }

    return (
        <>
            <style>
                {`
                   .blockComp {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 0.5px solid #131417;
                    transition: border-color 0.3s ease, border-width 0.3s ease;
                }
                
                .highlight {
                    border-color: white;
                    box-shadow: 
                        0 0 10px 5px rgba(255, 255, 255, 0.2),
                        inset 0 0 10px 5px rgba(255, 255, 255, 0.2); 
                }
                
                
                `}
            </style>
            <div className="fixed top-0 left-0 w-[100vw] h-[100vh] overflow-hidden z-[0]">
                <div ref={blockContainer} className='w-full h-full flex flex-wrap'></div>
            </div>
        </>
    );
    
}

export default Block;
