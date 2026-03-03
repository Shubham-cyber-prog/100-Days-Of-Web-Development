import { JSONViewer } from './JSONViewer';

interface DecodedViewProps {
  header: any;
  payload: any;
}

const STANDARD_CLAIMS = ['iss', 'sub', 'aud', 'exp', 'iat', 'nbf', 'jti'];

export function DecodedView({ header, payload }: DecodedViewProps) {
  return (
    <div className="flex h-full flex-col border-r">
      <div className="border-b px-4 py-3">
        <h2 className="font-semibold">Decoded</h2>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex h-1/2 border-b">
          <JSONViewer title="HEADER" data={header} />
        </div>
        
        <div className="flex h-1/2">
          <JSONViewer 
            title="PAYLOAD" 
            data={payload} 
            highlightKeys={STANDARD_CLAIMS}
          />
        </div>
      </div>
    </div>
  );
}
