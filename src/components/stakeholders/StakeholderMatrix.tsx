import React from 'react';
import type { Stakeholder } from '../../types/stakeholder';

interface StakeholderMatrixProps {
  stakeholders: Stakeholder[];
}

export function StakeholderMatrix({ stakeholders }: StakeholderMatrixProps) {
  const getStakeholdersForQuadrant = (influence: string, interest: string) => {
    return stakeholders.filter(
      (s) => s.influence === influence && s.interest === interest
    );
  };

  const renderQuadrant = (influence: string, interest: string, title: string) => (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <div className="space-y-2">
        {getStakeholdersForQuadrant(influence, interest).map((stakeholder) => (
          <div
            key={stakeholder.id}
            className="p-2 bg-gray-50 rounded-md text-sm flex items-center"
          >
            <img
              className="h-6 w-6 rounded-full mr-2"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                stakeholder.name
              )}&background=0D8ABC&color=fff`}
              alt=""
            />
            <span className="text-gray-900">{stakeholder.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        {renderQuadrant('high', 'high', 'Key Players')}
        {renderQuadrant('high', 'low', 'Meet Their Needs')}
      </div>
      <div className="space-y-4">
        {renderQuadrant('low', 'high', 'Show Consideration')}
        {renderQuadrant('low', 'low', 'Monitor')}
      </div>
    </div>
  );
}