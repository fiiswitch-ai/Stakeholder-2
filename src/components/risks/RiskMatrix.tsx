import React from 'react';
import type { Risk } from '../../types/risk';

interface RiskMatrixProps {
  risks: Risk[];
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const getMatrixCell = (probability: string, impact: string) => {
    return risks.filter(
      (risk) => risk.probability === probability && risk.impact === impact
    );
  };

  const getCellColor = (probability: string, impact: string) => {
    if (probability === 'high' && impact === 'high') return 'bg-red-50';
    if (probability === 'high' || impact === 'high') return 'bg-orange-50';
    if (probability === 'low' && impact === 'low') return 'bg-green-50';
    return 'bg-yellow-50';
  };

  const renderCell = (probability: string, impact: string) => {
    const cellRisks = getMatrixCell(probability, impact);
    return (
      <div
        className={`p-4 border ${getCellColor(probability, impact)} min-h-[150px]`}
      >
        {cellRisks.map((risk) => (
          <div
            key={risk.id}
            className="mb-2 p-2 bg-white rounded shadow-sm text-sm"
          >
            <div className="font-medium text-gray-900">{risk.title}</div>
            <div className="text-xs text-gray-500 mt-1">{risk.owner}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1"></div>
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <div className="text-center font-medium text-sm text-gray-700">
              Low Impact
            </div>
            <div className="text-center font-medium text-sm text-gray-700">
              Medium Impact
            </div>
            <div className="text-center font-medium text-sm text-gray-700">
              High Impact
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-[150px] flex items-center">
              <span className="transform -rotate-90 font-medium text-sm text-gray-700 whitespace-nowrap">
                High Probability
              </span>
            </div>
            <div className="h-[150px] flex items-center">
              <span className="transform -rotate-90 font-medium text-sm text-gray-700 whitespace-nowrap">
                Medium Probability
              </span>
            </div>
            <div className="h-[150px] flex items-center">
              <span className="transform -rotate-90 font-medium text-sm text-gray-700 whitespace-nowrap">
                Low Probability
              </span>
            </div>
          </div>

          <div className="col-span-3 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {renderCell('high', 'low')}
              {renderCell('high', 'medium')}
              {renderCell('high', 'high')}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {renderCell('medium', 'low')}
              {renderCell('medium', 'medium')}
              {renderCell('medium', 'high')}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {renderCell('low', 'low')}
              {renderCell('low', 'medium')}
              {renderCell('low', 'high')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}