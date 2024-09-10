Assignment: Do not block the event loop
Objective: Your task is to try to implement your own solution in order to do not block the event loop when doing CPU-Bound intensive operation.

Requirements:

Do Not Block: Create a new solution that avoid blocking the event loop when finding prime numbers within a range. In this way the program will be able to process other incoming request in the meantime.

In the example that you find within the index.js, the problem is that the blocking version blocks the new incoming request untill the blocking request has finished:


Id: 1. Starting blocking request. Find primes from 2 to 25
Id: 1. Finished blocking request. Elapsed ms: 171

Id: 2. Doing new incoming request
Id: 3. Doing new incoming request
Id: 4. Doing new incoming request
Id: 5. Doing new incoming request
Id: 6. Doing new incoming request

This approach doesn't allow the server to process other incoming requests.

In a non-blocking version, something like this could be achieved:

Id: 1. Starting non-blocking request. Find primes from 2 to 25

Id: 2. Doing new incoming request

Id: 1. Elaborating primes from 2 to 10
Id: 1. Suspended non-blocking request

Id: 3. Doing new incoming request

Id: 4. Doing new incoming request

Id: 1. Elaborating primes from 10 to 20
Id: 1. Suspended non-blocking request

Id: 5. Doing new incoming request

Id: 6. Doing new incoming request

Id: 1. Elaborating primes from 20 to 30
Id: 1. Finished non-blocking request. Elapsed ms: 3018
primes: 2,3,5,7,11,13,17,19,23,29

Id: 7. Doing new incoming request

Additional Notes:

You are permitted to modify only the index.js file.
The otherIncomingRequests() has to be able to continue to working during the calculation. You cannot modify it.
You cannot modify the method getPrimeNumbersWithinRange(n, m) of the math-utils.
You cannot use and spawn worker threads.
Feel free to reach out if you have any questions or need clarification on the requirements.
Achievable Points (5): - Do Not Block: 5 points