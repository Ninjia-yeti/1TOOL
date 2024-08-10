import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Trans } from '@kit/ui/trans';

export function ErrorAlert({ error }: { error: string }) {
    return (
        <Alert variant={'destructive'}>
            <ExclamationTriangleIcon className={'h-4'} />
            <AlertTitle>
                <Trans i18nKey={'contact:errorTitle'} />
            </AlertTitle>

            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    );
}