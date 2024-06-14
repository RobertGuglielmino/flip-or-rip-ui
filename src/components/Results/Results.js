import './Results.css';
import { Box, Text } from '@chakra-ui/react';
import centsToDollars from '../../helpers/CentsToDollarFormatter.js';

function Results(props) {

    return (
        <div className="Results">
            <Box>
                <Text>u lost this much money :( :</Text>
                <Text>{centsToDollars(props.lostValue)}</Text>
            </Box>
        </div>
    );
}

export default Results;