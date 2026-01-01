/** Calendar.js Test Cases - PHASE 3 */

// Test Case 1: getWeekNumber
console.log('=== Test 1: getWeekNumber ===');
const d1 = new Date('2025-01-05');
console.log('Week 1:', Calendar.getWeekNumber(d1));
console.log('Expected: 1-4');

// Test Case 2: getPhase
console.log('\n=== Test 2: getPhase ===');
console.log('Week 2 (FOCUS):', Calendar.getPhase(2));
console.log('Week 8 (BUILD):', Calendar.getPhase(8));
console.log('Week 16 (OPTIMIZE):', Calendar.getPhase(16));
console.log('Week 25 (REST):', Calendar.getPhase(25));

// Test Case 3: isDeloadWeek
console.log('\n=== Test 3: isDeloadWeek ===');
console.log('Week 4 (deload):', Calendar.isDeloadWeek(4));
console.log('Week 8 (deload):', Calendar.isDeloadWeek(8));
console.log('Week 1 (not deload):', Calendar.isDeloadWeek(1));

// Test Case 4: getMatadorState
console.log('\n=== Test 4: getMatadorState ===');
console.log('Week 21 (deficit):', Calendar.getMatadorState(21));
console.log('Week 23 (maintenance):', Calendar.getMatadorState(23));
console.log('Week 1 (null):', Calendar.getMatadorState(1));

// Test Case 5: MATADOR Pattern
console.log('\n=== Test 5: MATADOR Weeks 21-28 ===');
for (let w = 21; w <= 28; w++) {
  console.log(`Week ${w}:`, Calendar.getMatadorState(w));
}

console.log('\n=== Tests Complete ===');
