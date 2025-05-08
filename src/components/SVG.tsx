import React, { useEffect, useRef } from 'react';

interface SVGProps {
  path: string;
  className?: string;
  fillColor: string;
  width?: number | string;
  height?: number | string;
}

const SVG: React.FC<SVGProps> = ({ 
    path, 
    className,
    fillColor,
    width,
    height
  }) => {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAndModifySVG = async () => {
      try {
        const response = await fetch(path);
        const svgText = await response.text();

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');

        if (svgElement) {
          // Since SVGs can have multiple "fill" attributes.
          svgElement.querySelectorAll('[fill]').forEach((el) => {
            el.removeAttribute('fill');
          });

          svgElement.setAttribute('fill', fillColor);
          
          if (width !== undefined) {
            svgElement.setAttribute(
              'width', 
              typeof width === 'number' ? `${width}px` : width
            );
          }
          
          if (height !== undefined) {
            svgElement.setAttribute(
              'height',
              typeof height === 'number' ? `${height}px` : height
            );
          }

          if (container.current) {
            container.current.innerHTML = '';
            container.current.appendChild(svgElement);
          }
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadAndModifySVG();
  }, [path, fillColor]);

  return <div ref={container} className={className} />;
};

export default SVG;