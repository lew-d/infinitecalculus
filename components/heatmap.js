import CalendarHeatmap from 'react-calendar-heatmap';


function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Heatmap() {
    const today = new Date();
    const randomValues = getRange(200).map(index => {
        return {
            date: shiftDate(today, -index),
            count: getRandomInt(1, 3),
        };
    });

    return <CalendarHeatmap
        startDate={shiftDate(today, -150)}
        endDate={today}
        values={randomValues}
        classForValue={value => {
            if (!value) {
                return 'color-empty';
            }
            return `color-github-${value.count}`;
        }}
    />
}