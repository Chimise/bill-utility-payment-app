import React from 'react';
import Button from '../../ui/Button/Button';

interface ErrorBoundaryProps {
    children: React.ReactNode
}


class ErrorBoundary extends React.Component<ErrorBoundaryProps, {hasError: boolean}> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error: Error) {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log({error: error.message, errorInfo});
    }

    

    render() {
        if(this.state.hasError) {
            return (<div className='w-screen h-screen flex items-center justify-center'>
                <div className='space-y-4'>
                    <p className='text-lg text-gray-800 font-light'>An error just occured</p>
                    <Button variant='slim' onClick={() => {
                        this.setState({hasError: false});
                    }}>Try Again</Button>
                </div>
            </div>)
        }

        return this.props.children;
    }
};

export default ErrorBoundary;