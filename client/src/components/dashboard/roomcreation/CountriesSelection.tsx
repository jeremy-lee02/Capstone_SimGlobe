import React, { useState } from 'react';

const countryGroups = [
    {
      title: 'Small GDP, Small Pop:',
      countries: ['Vanuatu', 'Micronesia', 'Cabo Verde', 'Lesotho'],
    },
    {
      title: 'Small GDP, Medium Pop:',
      countries: ['Cambodia', 'Lao', 'Honduras', 'Zimbabwe', 'Tajikistan'],
    },
    {
      title: 'Small GDP, Big Pop:',
      countries: ['Congo', 'Nepal', 'Bangladesh', 'Nigeria'],
    },
    {
      title: 'Medium GDP, Small Pop:',
      countries: ['Jamaica', 'Kosovo', 'Namibia'],
    },
    {
      title: 'Medium GDP, Medium Pop:',
      countries: ['Uruguay', 'Bulgaria', 'Mongolia', 'Jordan'],
    },
    {
      title: 'Medium GDP, Big Pop:',
      countries: ['Argentina', 'Thailand', 'Vietnam', 'Brazil', 'Mexico', 'Philippines', 'Indonesia', 'China', 'Colombia', 'Egypt'],
    },
    {
      title: 'Big GDP, Small Pop:',
      countries: ['Brunei', 'Luxembourg', 'Malta', 'Singapore', 'Switzerland', 'Norway'],
    },
    {
      title: 'Big GDP, Medium Pop:',
      countries: ['Ireland', 'New Zealand', 'Israel', 'United Arab Emirates', 'India', 'Russia', 'France'],
    },
    {
      title: 'Big GDP, Big Pop:',
      countries: ['USA', 'Japan', 'Germany', 'UK', 'Australia', 'Korea'],
    },
  ];
const CountriesSelection: React.FC<{ onMoveToNumberofTeam: () => void }> = ({ onMoveToNumberofTeam }) => {


  const numTeams = parseInt(localStorage.getItem('numTeams') || '2', 10);

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleCountrySelection = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      if (selectedCountries.length < numTeams) {
        setSelectedCountries([...selectedCountries, country]);
      }
    }
  };

  const isCountrySelected = (country: string) => selectedCountries.includes(country);

  // Storing selected countries in an object
  const selectedCountriesObject: Record<string, string[]> = {};
  countryGroups.forEach((group) => {
    selectedCountriesObject[group.title] = group.countries.filter((country) =>
      isCountrySelected(country)
    );
  });

  const handleNext = () => {
    console.log('Selected Countries Object:', selectedCountriesObject);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">Countries Selection Page</h1>
        <p className="mb-4">Select countries for your teams:</p>
        <div className='max-h-[600px] mb-5 pr-6 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-700'>
        {countryGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="mb-2 font-semibold">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.countries.map((country) => (
                <button
                  key={country}
                  className={`px-4 py-2 rounded-md ${
                    isCountrySelected(country) ? 'bg-orange-500 text-white' : 'bg-black text-orange-500'
                  }`}
                  onClick={() => handleCountrySelection(country)}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
        <div className='flex justify-end'>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={onMoveToNumberofTeam}
          >
            Back
          </button>
        </div>
        <div className='flex justify-end'>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleNext}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountriesSelection;