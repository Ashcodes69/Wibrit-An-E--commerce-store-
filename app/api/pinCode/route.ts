export async function GET() {
  const pinCodes =[834005,12345,9087,5678]
  return new Response(JSON.stringify({pinCodes}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
