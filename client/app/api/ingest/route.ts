import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Proxy the request to the Go backend
    const backendEndpoint = 'http://localhost:8080/api/v1/jobs/scrape';

    const response = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend Error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Failed to proxy ingest request:', error);
    return NextResponse.json(
      { error: 'Failed to connect to the data engine.' },
      { status: 500 }
    );
  }
}
