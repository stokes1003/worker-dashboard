# Worker Dashboard

A modern React application for managing and searching worker profiles with advanced filtering capabilities.

## Features

- **Worker Search**: Search workers by name, skills, or certifications
- **Advanced Filtering**:
  - Skills filter with multi-select capability
  - Certifications filter with multi-select capability
  - Experience range filter
  - Hourly rate range filter
  - Availability filter
- **Worker Statistics**:
  - Total workers count
  - Experience distribution chart
  - Top skills distribution chart
  - Average experience and hourly rate
  - Total certifications count
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Mantine UI components

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Mantine UI
  - Recharts for data visualization
- **Development Tools**:
  - Vite
  - ESLint
  - Prettier

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/worker-dashboard.git
   cd worker-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/         # React components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── SearchBar.tsx   # Search and filter component
│   ├── WorkerCard.tsx  # Worker profile card component
│   └── WorkerStats.tsx # Statistics and charts component
├── types/             # TypeScript type definitions
│   └── worker.ts      # Worker-related types
└── App.tsx            # Root component
```

## Usage

1. **Search Workers**:

   - Use the search bar to find workers by name or skills
   - Click on autocomplete suggestions for quick filtering

2. **Filter Workers**:

   - Select skills from the Skills accordion
   - Choose certifications from the Certifications accordion
   - Set experience range using the Experience accordion
   - Set hourly rate range using the Hourly Rate accordion
   - Select availability types from the Availability section

3. **View Statistics**:

   - Check the Worker Stats section for overall statistics
   - View experience distribution in the bar chart
   - See top skills distribution in the pie chart

4. **Reset Filters**:
   - Click the Reset button to clear all filters

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Mantine UI](https://mantine.dev/) for the component library
- [Recharts](https://recharts.org/) for data visualization
- [Tabler Icons](https://tabler-icons.io/) for icons
