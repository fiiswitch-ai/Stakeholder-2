import React from 'react';
import type { CommunicationPlan } from '../../types/communication';

interface CommunicationCalendarProps {
  plans: CommunicationPlan[];
}

export function CommunicationCalendar({ plans }: CommunicationCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getDayPlans = (date: Date) => {
    return plans.filter((plan) => {
      if (!plan.nextScheduledDate) return false;
      const planDate = new Date(plan.nextScheduledDate);
      return (
        planDate.getDate() === date.getDate() &&
        planDate.getMonth() === date.getMonth() &&
        planDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayPlans = getDayPlans(date);
      const isSelected = selectedDate?.getDate() === day;

      days.push(
        <div
          key={day}
          className={`h-24 border-t border-l p-2 ${
            isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="font-medium text-sm">{day}</div>
          <div className="mt-1 space-y-1">
            {dayPlans.map((plan) => (
              <div
                key={plan.id}
                className="text-xs p-1 rounded bg-indigo-100 text-indigo-700 truncate"
              >
                {plan.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <div className="space-x-2">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
            className="px-3 py-1 border rounded hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
            className="px-3 py-1 border rounded hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}