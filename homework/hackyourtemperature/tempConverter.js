export default function temperatureConverter(tempKelvin) {
  return (tempKelvin - 273.15).toFixed(2);
}
