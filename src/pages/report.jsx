import { Helmet } from 'react-helmet-async';

// import { UserView } from 'src/sections/fleets/view';
import { FleetReportView } from 'src/sections/report/view';

// ----------------------------------------------------------------------

export default function FleetReportPage() {
    return (
        <>
            <Helmet>
                <title>Fleet Report </title>
            </Helmet>

            <FleetReportView />
        </>
    );
}
