import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import pixelImage from './DP.png'; // Make sure to add your PNG file

const InteractiveBoxesSection = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, text: "FRONTEND", baseWidth: 180, baseHeight: 60, mass: 1 },
    { id: 2, image: pixelImage, baseWidth: 140, baseHeight: 170, mass: 1 }, // Image box
    { id: 3, text: "UI / UX", baseWidth: 120, baseHeight: 60, mass: 1 },
    { id: 4, text: "DEVELOPER", baseWidth: 200, baseHeight: 60, mass: 1.5 },
    { id: 5, text: "FIGMA", baseWidth: 160, baseHeight: 60, mass: 1 }
  ]);

  const [draggedBox, setDraggedBox] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef();
  const lastTimeRef = useRef(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Physics constants
  const GRAVITY = 0.2;
  const FRICTION = 0.96;
  const AIR_RESISTANCE = 0.99;
  const BOUNCE = 0.7;
  const REPULSION = 0.8;
  const INERTIA = 0.95;
  const SPRING = 0.1;
  const ROTATION_FRICTION = 0.97;
  const MAX_ROTATION = 15;

  // Responsive setup
  useEffect(() => {
    const updateDimensions = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      
      const vh = Math.max(window.innerHeight / (isMobileDevice ? 3.5 : 3), 250);
      setContainerHeight(vh);
      
      const container = containerRef.current;
      if (!container) return;
      
      const newScale = isMobileDevice ? 
        Math.min(container.clientWidth / 400, 0.8) :
        Math.min(container.clientWidth / 1200, 1.2);
      setScaleFactor(Math.max(newScale, 0.6));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Check if two boxes overlap
  const checkOverlap = (box1, box2) => {
    return (
      box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.height &&
      box1.y + box1.height > box2.y
    );
  };

  // Initialize brick layout
  useEffect(() => {
    const container = containerRef.current;
    if (!container || containerHeight === 0) return;

    const containerWidth = container.clientWidth;
    
    const scaledBoxes = boxes.map(box => ({
      ...box,
      width: box.baseWidth * scaleFactor,
      height: box.baseHeight * scaleFactor,
      fontSize: `${Math.max(12, 14 * scaleFactor)}px`,
      rotation: (Math.random() * 2 - 1) * MAX_ROTATION,
      angularVelocity: (Math.random() * 2 - 1) * 0.5,
      centerX: 0,
      centerY: 0,
      lastX: 0,
      lastY: 0
    }));

    const getRandomPosition = (box, placedBoxes, maxAttempts = 100) => {
      const container = containerRef.current;
      if (!container) return { x: 0, y: 0 };
      
      const containerWidth = container.clientWidth;
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        attempts++;
        const x = Math.random() * (containerWidth - box.width);
        const y = Math.random() * (containerHeight - box.height);
        const testBox = { ...box, x, y };
        const overlaps = placedBoxes.some(placedBox => checkOverlap(testBox, placedBox));
        
        if (!overlaps) return { x, y };
      }
      
      return {
        x: Math.random() * (containerWidth - box.width),
        y: Math.random() * (containerHeight - box.height)
      };
    };

    const positionedBoxes = [];
    for (const box of scaledBoxes) {
      const position = getRandomPosition(box, positionedBoxes);
      
      positionedBoxes.push({
        ...box,
        x: position.x,
        y: position.y,
        vx: (Math.random() * 2 - 1) * 2,
        vy: (Math.random() * 2 - 1) * 2,
        ax: 0,
        ay: 0,
        centerX: position.x + box.width / 2,
        centerY: position.y + box.height / 2,
        lastX: position.x,
        lastY: position.y
      });
    }

    setBoxes(positionedBoxes);
  }, [containerHeight, scaleFactor]);

  const checkCollision = (box1, box2) => {
    if (box1.id === box2.id) return false;
    return (
      box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.height &&
      box1.y + box1.height > box2.y
    );
  };

  const resolveCollisions = (box, allBoxes) => {
    allBoxes.forEach(otherBox => {
      if (checkCollision(box, otherBox)) {
        const overlapX = Math.min(
          box.x + box.width - otherBox.x,
          otherBox.x + otherBox.width - box.x
        );
        const overlapY = Math.min(
          box.y + box.height - otherBox.y,
          otherBox.y + otherBox.height - box.y
        );

        if (overlapX < overlapY) {
          const direction = box.x < otherBox.x ? -1 : 1;
          const totalMass = box.mass + otherBox.mass;
          const impulse = (REPULSION * overlapX) / totalMass;
          
          box.ax -= direction * SPRING * overlapX / box.mass;
          otherBox.ax += direction * SPRING * overlapX / otherBox.mass;
          
          box.vx = (box.vx * (box.mass - otherBox.mass) + 2 * otherBox.mass * otherBox.vx) / totalMass;
          otherBox.vx = (otherBox.vx * (otherBox.mass - box.mass) + 2 * box.mass * box.vx) / totalMass;
          
          box.vx = -box.vx * BOUNCE;
          otherBox.vx = -otherBox.vx * BOUNCE;
          
          const collisionPointY = (box.centerY + otherBox.centerY) / 2;
          const boxCollisionY = collisionPointY - box.centerY;
          const otherBoxCollisionY = collisionPointY - otherBox.centerY;
          
          box.angularVelocity += boxCollisionY * box.vx * 0.01;
          otherBox.angularVelocity -= otherBoxCollisionY * otherBox.vx * 0.01;
          
          box.x += direction * overlapX * 0.5;
          otherBox.x -= direction * overlapX * 0.5;
        } else {
          const direction = box.y < otherBox.y ? -1 : 1;
          const totalMass = box.mass + otherBox.mass;
          const impulse = (REPULSION * overlapY) / totalMass;
          
          box.ay -= direction * SPRING * overlapY / box.mass;
          otherBox.ay += direction * SPRING * overlapY / otherBox.mass;
          
          box.vy = (box.vy * (box.mass - otherBox.mass) + 2 * otherBox.mass * otherBox.vy) / totalMass;
          otherBox.vy = (otherBox.vy * (otherBox.mass - box.mass) + 2 * box.mass * box.vy) / totalMass;
          
          box.vy = -box.vy * BOUNCE;
          otherBox.vy = -otherBox.vy * BOUNCE;
          
          const collisionPointX = (box.centerX + otherBox.centerX) / 2;
          const boxCollisionX = collisionPointX - box.centerX;
          const otherBoxCollisionX = collisionPointX - otherBox.centerX;
          
          box.angularVelocity -= boxCollisionX * box.vy * 0.01;
          otherBox.angularVelocity += otherBoxCollisionX * otherBox.vy * 0.01;
          
          box.y += direction * overlapY * 0.5;
          otherBox.y -= direction * overlapY * 0.5;
        }
        
        box.centerX = box.x + box.width / 2;
        box.centerY = box.y + box.height / 2;
        otherBox.centerX = otherBox.x + otherBox.width / 2;
        otherBox.centerY = otherBox.y + otherBox.height / 2;
      }
    });
  };

  const enforceBoundaries = (box, containerWidth, containerHeight) => {
    let { x, y, width, height, vx, vy, ax, ay, rotation, angularVelocity } = box;
    
    if (x < 0) {
      x = 0;
      vx = -vx * BOUNCE;
      ax = -ax * 0.5;
      angularVelocity += vy * 0.2;
    } else if (x + width > containerWidth) {
      x = containerWidth - width;
      vx = -vx * BOUNCE;
      ax = -ax * 0.5;
      angularVelocity -= vy * 0.2;
    }
    
    if (y < 0) {
      y = 0;
      vy = -vy * BOUNCE;
      ay = -ay * 0.5;
      angularVelocity -= vx * 0.1;
    } else if (y + height > containerHeight) {
      y = containerHeight - height;
      vy = -vy * BOUNCE;
      ay = -ay * 0.5;
      angularVelocity += vx * 0.1;
    }
    
    rotation += angularVelocity;
    angularVelocity *= ROTATION_FRICTION;
    angularVelocity *= AIR_RESISTANCE;
    
    if (Math.abs(rotation) > MAX_ROTATION) {
      rotation = MAX_ROTATION * Math.sign(rotation);
      angularVelocity *= 0.5;
    }
    
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    
    return { ...box, x, y, vx, vy, ax, ay, rotation, angularVelocity, centerX, centerY };
  };

  // Drag handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const clickedBox = boxes.find(box => 
        mouseX >= box.x && 
        mouseX <= box.x + box.width && 
        mouseY >= box.y && 
        mouseY <= box.y + box.height
      );

      if (clickedBox) {
        setIsDragging(true);
        setDraggedBox({
          ...clickedBox,
          offsetX: mouseX - clickedBox.x,
          offsetY: mouseY - clickedBox.y,
          vx: 0,
          vy: 0,
          ax: 0,
          ay: 0,
          rotation: clickedBox.rotation,
          angularVelocity: 0,
          lastX: clickedBox.x,
          lastY: clickedBox.y
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !draggedBox) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let newX = mouseX - draggedBox.offsetX;
      let newY = mouseY - draggedBox.offsetY;
      
      newX = Math.max(0, Math.min(newX, rect.width - draggedBox.width));
      newY = Math.max(0, Math.min(newY, rect.height - draggedBox.height));
      
      const vx = (newX - draggedBox.x) * 0.5;
      const vy = (newY - draggedBox.y) * 0.5;
      
      let newRotation = draggedBox.rotation;
      if (Math.abs(vx) > 1) {
        newRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, vy * 0.5));
      }
      
      setDraggedBox({
        ...draggedBox,
        x: newX,
        y: newY,
        vx,
        vy,
        rotation: newRotation,
        centerX: newX + draggedBox.width / 2,
        centerY: newY + draggedBox.height / 2,
        lastX: draggedBox.x,
        lastY: draggedBox.y
      });
    };

    const handleMouseUp = () => {
      if (isDragging && draggedBox) {
        const dx = draggedBox.x - draggedBox.lastX;
        const dy = draggedBox.y - draggedBox.lastY;
        const angularVelocity = (dx + dy) * 0.1;
        
        setBoxes(boxes.map(box => 
          box.id === draggedBox.id ? {
            ...box,
            x: draggedBox.x,
            y: draggedBox.y,
            vx: draggedBox.vx * 1.5,
            vy: draggedBox.vy * 1.5,
            rotation: draggedBox.rotation,
            angularVelocity: angularVelocity,
            centerX: draggedBox.centerX,
            centerY: draggedBox.centerY,
            lastX: draggedBox.x,
            lastY: draggedBox.y
          } : box
        ));
      }
      setIsDragging(false);
      setDraggedBox(null);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      const touchedBox = boxes.find(box => 
        touchX >= box.x && 
        touchX <= box.x + box.width && 
        touchY >= box.y && 
        touchY <= box.y + box.height
      );

      if (touchedBox) {
        setIsDragging(true);
        setDraggedBox({
          ...touchedBox,
          offsetX: touchX - touchedBox.x,
          offsetY: touchY - touchedBox.y,
          vx: 0,
          vy: 0,
          ax: 0,
          ay: 0,
          rotation: touchedBox.rotation,
          angularVelocity: 0,
          lastX: touchedBox.x,
          lastY: touchedBox.y
        });
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || !draggedBox) return;
      e.preventDefault();

      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      let newX = touchX - draggedBox.offsetX;
      let newY = touchY - draggedBox.offsetY;
      
      newX = Math.max(0, Math.min(newX, rect.width - draggedBox.width));
      newY = Math.max(0, Math.min(newY, rect.height - draggedBox.height));
      
      const vx = (newX - draggedBox.x) * 0.5;
      const vy = (newY - draggedBox.y) * 0.5;
      
      let newRotation = draggedBox.rotation;
      if (Math.abs(vx) > 1) {
        newRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, vy * 0.5));
      }
      
      setDraggedBox({
        ...draggedBox,
        x: newX,
        y: newY,
        vx,
        vy,
        rotation: newRotation,
        centerX: newX + draggedBox.width / 2,
        centerY: newY + draggedBox.height / 2,
        lastX: draggedBox.x,
        lastY: draggedBox.y
      });
    };

    const handleTouchEnd = () => {
      handleMouseUp();
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, draggedBox, boxes]);

  // Physics animation loop
  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = Math.min(timestamp - lastTimeRef.current, 32);
      lastTimeRef.current = timestamp;

      if (deltaTime > 0 && !isDragging) {
        setBoxes(prevBoxes => {
          const container = containerRef.current;
          if (!container) return prevBoxes;
          const containerWidth = container.clientWidth;

          const newBoxes = prevBoxes.map(box => {
            let ay = box.ay + GRAVITY;
            let ax = box.ax * FRICTION;
            ay = ay * FRICTION;
            let vx = (box.vx + ax) * INERTIA;
            let vy = (box.vy + ay) * INERTIA;
            let newX = box.x + vx;
            let newY = box.y + vy;
            let newRotation = box.rotation + box.angularVelocity;
            let newAngularVelocity = box.angularVelocity * ROTATION_FRICTION;
            newAngularVelocity *= AIR_RESISTANCE;
            
            if (Math.abs(newRotation) > MAX_ROTATION) {
              newRotation = MAX_ROTATION * Math.sign(newRotation);
              newAngularVelocity *= 0.5;
            }

            return { 
              ...box, 
              x: newX, 
              y: newY, 
              vx, 
              vy,
              ax: 0,
              ay: 0,
              rotation: newRotation,
              angularVelocity: newAngularVelocity,
              centerX: newX + box.width / 2,
              centerY: newY + box.height / 2,
              lastX: box.x,
              lastY: box.y
            };
          });

          for (let i = 0; i < newBoxes.length; i++) {
            resolveCollisions(newBoxes[i], newBoxes);
          }

          return newBoxes.map(box => 
            enforceBoundaries(box, containerWidth, containerHeight)
          );
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging, containerHeight]);

  const displayBoxes = isDragging 
    ? boxes.map(box => box.id === draggedBox?.id ? draggedBox : box)
    : boxes;

  return (
    <Container ref={containerRef} style={{ height: `${containerHeight}px` }}>
      {displayBoxes.map(box => (
        <Box 
          key={box.id}
          style={{
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            fontSize: box.fontSize,
            cursor: isDragging && box.id === draggedBox?.id ? 'grabbing' : 'grab',
            transform: `translate3d(0, 0, 0) rotate(${box.rotation}deg)`,
            transition: isDragging && box.id === draggedBox?.id ? 'none' : 'transform 0.1s ease',
            zIndex: isDragging && box.id === draggedBox?.id ? 100 : 1,
            opacity: isDragging && box.id === draggedBox?.id ? 0.9 : 1,
            transformOrigin: 'center center',
            background: box.image ? `url(${box.image}) center/contain no-repeat` : '#000000',
            color: box.image ? 'transparent' : 'white'
          }}
        >
          {!box.image && box.text}
        </Box>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  border-radius: 8px;
  touch-action: none;
  margin: 0 15px;
  user-select: none;
`;

const Box = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: white;
  border: 0.4px solid white;
  border-radius: 18px;
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  padding: 0 15px;
  will-change: transform;
  white-space: nowrap;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  backface-visibility: hidden;
  
  &:active {
    box-shadow: 0 0 15px rgba(255,255,255,0.7);
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    border-radius: 8px;
  }
`;

export default InteractiveBoxesSection;