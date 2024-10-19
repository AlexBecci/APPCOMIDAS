export async function getUserId(): Promise<number | null> {
    const userId = await localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
}