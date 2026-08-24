import React, { useState, useEffect, useRef } from 'react';

export default function CountUpNumber({ 
  end = 0, 
  duration = 1600, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  formatter = null,
  className = ''
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const target = Number(end) || 0;
    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease-out cubic curve (Apple Keynote style)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (target - start) * easeOut;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [hasAnimated, end, duration]);

  const displayValue = formatter 
    ? formatter(count) 
    : decimals > 0 
      ? count.toFixed(decimals) 
      : Math.round(count).toLocaleString('en-IN');

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
