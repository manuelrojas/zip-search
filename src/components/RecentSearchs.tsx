import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export type SearchInput = {
  country: string | null;
  postalCode: string | null;
};

type RecentSearchsProps = {
  searchs: [SearchInput] | [];
  onClear: () => void
};

export function RecentSearchs({ searchs, onClear }: RecentSearchsProps) {
  return (
    <Stack sx={{ width: '40%', marginBottom: '20px' }} spacing={2}>
      {searchs?.length === 0 && (
        <Alert severity='warning'>No search history</Alert>
      )}
      {searchs?.length > 0 && (
        <Box>
          {searchs?.slice(-5).map((item: SearchInput) => (
            <>
              <Alert severity='info'>
                Country: {item?.country?.toUpperCase()}, Postal Code:{' '}
                {item?.postalCode}
              </Alert>
            </>
          ))}
          <Button
            onClick={onClear}
          >
            Clear Histroy
          </Button>
        </Box>
      )}
    </Stack>
  );
}