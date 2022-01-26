import TailwindColor from '@videsk/tailwind-random-color';
const randomColor = () => {
  const options = {
    colors: ['gray', 'indigo', 'red', 'orange', 'blue', 'purple'],
    range: [1, 4], // Between 100 and 400,
  };
  return new TailwindColor(options).pick();
};

export default randomColor;
