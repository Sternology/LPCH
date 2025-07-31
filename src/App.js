import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine, ReferenceArea } from 'recharts';
import { CheckCircle, AlertCircle, Target } from 'lucide-react';

const OncologyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedStages, setExpandedStages] = useState({});

  // Monthly trend data with calculated rates
  const monthlyTrends = {
    impressions: [
      { month: 'Jun-Jul 24', value: 146517 },
      { month: 'Aug 24', value: 195667 },
      { month: 'Sep 24', value: 208676 },
      { month: 'Oct 24', value: 115477 },
      { month: 'Nov 24', value: 92412 },
      { month: 'Dec 24', value: 106016 },
      { month: 'Jan 25', value: 185822 },
      { month: 'Feb 25', value: 55687 },
      { month: 'Mar 25', value: 65732 },
      { month: 'Apr 25', value: 53915 },
      { month: 'May 25', value: 81366 }
    ],
    clicks: [
      { month: 'Jun-Jul 24', value: 5089, ctr: 3.47 },
      { month: 'Aug 24', value: 5340, ctr: 2.73 },
      { month: 'Sep 24', value: 5017, ctr: 2.40 },
      { month: 'Oct 24', value: 3325, ctr: 2.88 },
      { month: 'Nov 24', value: 2789, ctr: 3.02 },
      { month: 'Dec 24', value: 2349, ctr: 2.22 },
      { month: 'Jan 25', value: 3080, ctr: 1.66 },
      { month: 'Feb 25', value: 1536, ctr: 2.76 },
      { month: 'Mar 25', value: 1301, ctr: 1.98 },
      { month: 'Apr 25', value: 1338, ctr: 2.48 },
      { month: 'May 25', value: 1729, ctr: 2.12 }
    ],
    applyclicks: [
      { month: 'Jun-Jul 24', value: 477, applyRate: 9.37 }, // (477/5089)*100
      { month: 'Aug 24', value: 492, applyRate: 9.21 },
      { month: 'Sep 24', value: 326, applyRate: 6.50 },
      { month: 'Oct 24', value: 204, applyRate: 6.14 },
      { month: 'Nov 24', value: 180, applyRate: 6.45 },
      { month: 'Dec 24', value: 150, applyRate: 6.39 },
      { month: 'Jan 25', value: 200, applyRate: 6.49 },
      { month: 'Feb 25', value: 120, applyRate: 7.81 },
      { month: 'Mar 25', value: 160, applyRate: 12.30 },
      { month: 'Apr 25', value: 220, applyRate: 16.44 },
      { month: 'May 25', value: 271, applyRate: 15.67 }
    ],
    applicationsstarted: [
      { month: 'Jun-Jul 24', value: 35, completionRate: 74.29 }, // (26/35)*100
      { month: 'Aug 24', value: 15, completionRate: 73.33 },
      { month: 'Sep 24', value: 32, completionRate: 87.50 },
      { month: 'Oct 24', value: 20, completionRate: 85.00 },
      { month: 'Nov 24', value: 18, completionRate: 88.89 },
      { month: 'Dec 24', value: 22, completionRate: 90.91 },
      { month: 'Jan 25', value: 12, completionRate: 66.67 },
      { month: 'Feb 25', value: 18, completionRate: 83.33 },
      { month: 'Mar 25', value: 45, completionRate: 88.89 },
      { month: 'Apr 25', value: 65, completionRate: 89.23 },
      { month: 'May 25', value: 48, completionRate: 89.58 }
    ],
    applicationscompleted: [
      { month: 'Jun-Jul 24', value: 26 },
      { month: 'Aug 24', value: 11 },
      { month: 'Sep 24', value: 28 },
      { month: 'Oct 24', value: 17 },
      { month: 'Nov 24', value: 16 },
      { month: 'Dec 24', value: 20 },
      { month: 'Jan 25', value: 8 },
      { month: 'Feb 25', value: 15 },
      { month: 'Mar 25', value: 40 },
      { month: 'Apr 25', value: 58 },
      { month: 'May 25', value: 43 }
    ],
    totalapplications: [
      { month: 'Jun-Jul 24', value: 26 },
      { month: 'Aug 24', value: 11 },
      { month: 'Sep 24', value: 28 },
      { month: 'Oct 24', value: 12 },
      { month: 'Nov 24', value: 16 },
      { month: 'Dec 24', value: 20 },
      { month: 'Jan 25', value: 8 },
      { month: 'Feb 25', value: 15 },
      { month: 'Mar 25', value: 40 },
      { month: 'Apr 25', value: 58 },
      { month: 'May 25', value: 43 }
    ],
    uniqueapplications: [
      { month: 'Jun-Jul 24', value: 25 },
      { month: 'Aug 24', value: 11 },
      { month: 'Sep 24', value: 17 },
      { month: 'Oct 24', value: 11 },
      { month: 'Nov 24', value: 13 },
      { month: 'Dec 24', value: 15 },
      { month: 'Jan 25', value: 6 },
      { month: 'Feb 25', value: 11 },
      { month: 'Mar 25', value: 38 },
      { month: 'Apr 25', value: 54 },
      { month: 'May 25', value: 40 }
    ],
    screenapproved: [
      { month: 'Jun-Jul 24', value: 15, meaningfulRate: 60.0 }, // (15/25)*100
      { month: 'Aug 24', value: 2, meaningfulRate: 18.18 },
      { month: 'Sep 24', value: 5, meaningfulRate: 29.41 },
      { month: 'Oct 24', value: 5, meaningfulRate: 45.45 },
      { month: 'Nov 24', value: 3, meaningfulRate: 23.08 },
      { month: 'Dec 24', value: 5, meaningfulRate: 33.33 },
      { month: 'Jan 25', value: 5, meaningfulRate: 83.33 },
      { month: 'Feb 25', value: 5, meaningfulRate: 45.45 },
      { month: 'Mar 25', value: 1, meaningfulRate: 2.63 },
      { month: 'Apr 25', value: 3, meaningfulRate: 5.56 },
      { month: 'May 25', value: 3, meaningfulRate: 7.50 }
    ],
    interviewinvites: [
      { month: 'Jun-Jul 24', value: 8, inviteRate: 53.33 }, // (8/15)*100
      { month: 'Aug 24', value: 2, inviteRate: 100.0 },
      { month: 'Sep 24', value: 4, inviteRate: 80.0 },
      { month: 'Oct 24', value: 4, inviteRate: 80.0 },
      { month: 'Nov 24', value: 1, inviteRate: 33.33 },
      { month: 'Dec 24', value: 1, inviteRate: 20.0 },
      { month: 'Jan 25', value: 2, inviteRate: 40.0 },
      { month: 'Feb 25', value: 3, inviteRate: 60.0 },
      { month: 'Mar 25', value: 0, inviteRate: 0.0 },
      { month: 'Apr 25', value: 0, inviteRate: 0.0 },
      { month: 'May 25', value: 3, inviteRate: 100.0 }
    ],
    interviewsattended: [
      { month: 'Jun-Jul 24', invited: 8, attended: 2, attendanceRate: 25.0 },
      { month: 'Aug 24', invited: 2, attended: 0, attendanceRate: 0.0 },
      { month: 'Sep 24', invited: 4, attended: 4, attendanceRate: 100.0 },
      { month: 'Oct 24', invited: 4, attended: 3, attendanceRate: 75.0 },
      { month: 'Nov 24', invited: 1, attended: 0, attendanceRate: 0.0 },
      { month: 'Dec 24', invited: 1, attended: 0, attendanceRate: 0.0 },
      { month: 'Jan 25', invited: 2, attended: 2, attendanceRate: 100.0 },
      { month: 'Feb 25', invited: 3, attended: 2, attendanceRate: 66.67 },
      { month: 'Mar 25', invited: 0, attended: 0, attendanceRate: 0.0 },
      { month: 'Apr 25', invited: 0, attended: 0, attendanceRate: 0.0 },
      { month: 'May 25', invited: 3, attended: 2, attendanceRate: 66.67 }
    ],
    joboffers: [
      { month: 'Jun-Jul 24', value: 2, offerRate: 100.0 }, // (2/2)*100
      { month: 'Aug 24', value: 1, offerRate: 0.0 }, // No interviews attended
      { month: 'Sep 24', value: 1, offerRate: 25.0 }, // (1/4)*100
      { month: 'Oct 24', value: 2, offerRate: 66.67 }, // (2/3)*100
      { month: 'Nov 24', value: 0, offerRate: 0.0 },
      { month: 'Dec 24', value: 0, offerRate: 0.0 },
      { month: 'Jan 25', value: 1, offerRate: 50.0 }, // (1/2)*100
      { month: 'Feb 25', value: 0, offerRate: 0.0 },
      { month: 'Mar 25', value: 0, offerRate: 0.0 },
      { month: 'Apr 25', value: 0, offerRate: 0.0 },
      { month: 'May 25', value: 1, offerRate: 50.0 } // (1/2)*100
    ]
  };

  const toggleStage = (stageKey) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageKey]: !prev[stageKey]
    }));
  };

  // Key metrics
  const metrics = {
    totalOffers: 8,
    costPerOffer: 5000, // 40k / 8 offers
    totalInvestment: 40000
  };

  // Recruitment funnel data
  const recruitmentFunnelData = [
    { stage: 'Total Applications', value: 277 },
    { stage: 'Unique Applications', value: 241 },
    { stage: 'Screen Approved', value: 52 },
    { stage: 'Interview Invites', value: 28 },
    { stage: 'Interviews Attended', value: 15 },
    { stage: 'Job Offers', value: 8 }
  ];

  // Top of funnel data
  const topFunnelData = [
    { stage: 'Impressions', value: 1267000 },
    { stage: 'Clicks', value: 32000 },
    { stage: 'Apply Clicks', value: 2800 },
    { stage: 'Applications Started', value: 350 },
    { stage: 'Applications Completed', value: 277 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Lloyds Clinical - Oncology Nurse Recruitment</h1>
          <p className="text-blue-100">End of Campaign Analysis | June 2024 - May 2025</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600">{metrics.totalOffers}</div>
            <div className="text-gray-600">Total Job Offers</div>
            <div className="text-sm text-green-600">✓ Target Achieved</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600">£{metrics.costPerOffer.toLocaleString()}</div>
            <div className="text-gray-600">Cost Per Offer</div>
            <div className="text-sm text-blue-600">vs £5k-£8k agency</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-orange-600">£{metrics.totalInvestment.toLocaleString()}</div>
            <div className="text-gray-600">Total Investment</div>
            <div className="text-sm text-orange-600">All-in cost</div>
          </div>
        </div>

        {/* Funnels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top of Funnel */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Top of Funnel (Digital Marketing)</h3>
            <div className="space-y-3">
              {topFunnelData.map((item, index) => {
                const stageKey = item.stage.toLowerCase().replace(' ', '');
                return (
                  <div key={index}>
                    <div 
                      className="flex justify-between items-center p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleStage(stageKey)}
                    >
                      <span className="font-medium">{item.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">{item.value.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">{expandedStages[stageKey] ? '▼' : '▶'}</span>
                      </div>
                    </div>
                    {expandedStages[stageKey] && (
                      <div className="mt-2 p-4 bg-blue-50 rounded-lg transition-all duration-300 ease-in-out">
                        <h5 className="font-semibold mb-3">{item.stage} Trend</h5>
                        <ResponsiveContainer width="100%" height={200}>
                          {stageKey === 'clicks' ? (
                            <LineChart data={monthlyTrends.clicks}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              {/* Healthcare CTR benchmark: 3-5% */}
                              <ReferenceArea yAxisId="right" y1={3} y2={5} fill="#10b981" fillOpacity={0.1} />
                              <ReferenceLine yAxisId="right" y={3} stroke="#10b981" strokeDasharray="4 4" label="Industry CTR Min (3%)" />
                              <ReferenceLine yAxisId="right" y={5} stroke="#10b981" strokeDasharray="4 4" label="Industry CTR Max (5%)" />
                              <Line yAxisId="left" type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Clicks" />
                              <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#ef4444" strokeWidth={2} name="CTR %" />
                            </LineChart>
                          ) : stageKey === 'applyclicks' ? (
                            <LineChart data={monthlyTrends.applyclicks}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              {/* Apply rate benchmark: 8-12% */}
                              <ReferenceArea yAxisId="right" y1={8} y2={12} fill="#f59e0b" fillOpacity={0.1} />
                              <ReferenceLine yAxisId="right" y={8} stroke="#f59e0b" strokeDasharray="4 4" label="Industry Apply Rate Min (8%)" />
                              <ReferenceLine yAxisId="right" y={12} stroke="#f59e0b" strokeDasharray="4 4" label="Industry Apply Rate Max (12%)" />
                              <Line yAxisId="left" type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Apply Clicks" />
                              <Line yAxisId="right" type="monotone" dataKey="applyRate" stroke="#f59e0b" strokeWidth={2} name="Apply Rate %" />
                            </LineChart>
                          ) : stageKey === 'applicationsstarted' ? (
                            <LineChart data={monthlyTrends.applicationsstarted}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              {/* Application completion rate benchmark: 60-80% */}
                              <ReferenceArea yAxisId="right" y1={60} y2={80} fill="#10b981" fillOpacity={0.1} />
                              <ReferenceLine yAxisId="right" y={60} stroke="#10b981" strokeDasharray="4 4" label="Industry Completion Min (60%)" />
                              <ReferenceLine yAxisId="right" y={80} stroke="#10b981" strokeDasharray="4 4" label="Industry Completion Max (80%)" />
                              <Line yAxisId="left" type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Started" />
                              <Line yAxisId="right" type="monotone" dataKey="completionRate" stroke="#10b981" strokeWidth={2} name="Completion Rate %" />
                            </LineChart>
                          ) : (
                            <LineChart data={monthlyTrends[stageKey] || []}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recruitment Funnel */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Recruitment Funnel</h3>
            <div className="space-y-3">
              {recruitmentFunnelData.map((item, index) => {
                const stageKey = item.stage.toLowerCase().replace(' ', '').replace('total', '').replace('unique', '');
                return (
                  <div key={index}>
                    <div 
                      className="flex justify-between items-center p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleStage(stageKey)}
                    >
                      <span className="font-medium">{item.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">{item.value.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">{expandedStages[stageKey] ? '▼' : '▶'}</span>
                      </div>
                    </div>
                    {expandedStages[stageKey] && (
                      <div className="mt-2 p-4 bg-green-50 rounded-lg transition-all duration-300 ease-in-out">
                        <h5 className="font-semibold mb-3">{item.stage} Trend</h5>
                        <ResponsiveContainer width="100%" height={200}>
                          {stageKey === 'interviewsattended' ? (
                            <LineChart data={monthlyTrends.interviewsattended}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              {/* Interview attendance benchmark: 70-90% */}
                              <ReferenceArea yAxisId="right" y1={70} y2={90} fill="#8b5cf6" fillOpacity={0.1} />
                              <ReferenceLine yAxisId="right" y={70} stroke="#8b5cf6" strokeDasharray="4 4" label="Industry Attendance Min (70%)" />
                              <ReferenceLine yAxisId="right" y={90} stroke="#8b5cf6" strokeDasharray="4 4" label="Industry Attendance Max (90%)" />
                              <Line yAxisId="left" type="monotone" dataKey="invited" stroke="#10b981" strokeWidth={2} name="Invited" />
                              <Line yAxisId="left" type="monotone" dataKey="attended" stroke="#ef4444" strokeWidth={2} name="Attended" />
                              <Line yAxisId="right" type="monotone" dataKey="attendanceRate" stroke="#8b5cf6" strokeWidth={2} name="Attendance Rate %" />
                            </LineChart>
                          ) : stageKey === 'screenapproved' ? (
                            <LineChart data={monthlyTrends.screenapproved}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              {/* Meaningful application rate benchmark: 20-35% */}
                              <ReferenceArea yAxisId="right" y1={20} y2={35} fill="#f59e0b" fillOpacity={0.1} />
                              <ReferenceLine yAxisId="right" y={20} stroke="#f59e0b" strokeDasharray="4 4" label="Industry Screen Rate Min (20%)" />
                              <ReferenceLine yAxisId="right" y={35} stroke="#f59e0b" strokeDasharray="4 4" label="Industry Screen Rate Max (35%)" />
                              <Line yAxisId="left" type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="Screen Approved" />
                              <Line yAxisId="right" type="monotone" dataKey="meaningfulRate" stroke="#f59e0b" strokeWidth={2} name="Meaningful App Rate %" />
                            </LineChart>
                          ) : stageKey === 'interviewinvites' ? (
                            <LineChart data={monthlyTrends.interviewinvites}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              {/* Interview invite rate benchmark: 40-60% */}
                              <ReferenceArea yAxisId="right" y1={40} y2={60} fill="#8b5cf6" fillOpacity={0.1} />
                              <ReferenceLine yAxisId="right" y={40} stroke="#8b5cf6" strokeDasharray="4 4" label="Industry Invite Rate Min (40%)" />
                              <ReferenceLine yAxisId="right" y={60} stroke="#8b5cf6" strokeDasharray="4 4" label="Industry Invite Rate Max (60%)" />
                              <Line yAxisId="left" type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="Interview Invites" />
                              <Line yAxisId="right" type="monotone" dataKey="inviteRate" stroke="#8b5cf6" strokeWidth={2} name="Invite Rate %" />
                            </LineChart>
                          ) : stageKey === 'joboffers' ? (
                            <LineChart data={monthlyTrends.joboffers}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              {/* Interview to offer rate benchmark: 30-50% */}
                              <ReferenceArea yAxisId="right" y1={30} y2={50} fill="#ef4444" fillOpacity={0.1} />
                              <ReferenceLine yAxisId="right" y={30} stroke="#ef4444" strokeDasharray="4 4" label="Industry Offer Rate Min (30%)" />
                              <ReferenceLine yAxisId="right" y={50} stroke="#ef4444" strokeDasharray="4 4" label="Industry Offer Rate Max (50%)" />
                              <Line yAxisId="left" type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="Job Offers" />
                              <Line yAxisId="right" type="monotone" dataKey="offerRate" stroke="#ef4444" strokeWidth={2} name="Offer Rate %" />
                            </LineChart>
                          ) : (
                            <LineChart data={monthlyTrends[stageKey] || monthlyTrends.totalapplications}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Successes */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-800 mb-3 flex items-center">
              <CheckCircle className="mr-2" /> Successes
            </h4>
            <ul className="text-sm space-y-2">
              <li>✓ 37% cost savings vs agency fees</li>
              <li>✓ 8 job offers in niche market</li>
              <li>✓ Quality over quantity approach</li>
              <li>✓ Google Ads optimization success</li>
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-bold text-amber-800 mb-3 flex items-center">
              <AlertCircle className="mr-2" /> Observations
            </h4>
            <ul className="text-sm space-y-2">
              <li>⚠ 54% interview attendance (vs 70-90%)</li>
              <li>⚠ Screen approval variance high</li>
              <li>⚠ Lengthy onboarding process</li>
              <li>⚠ Process timing optimization needed</li>
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <Target className="mr-2" /> Recommendations
            </h4>
            <ul className="text-sm space-y-2">
              <li>→ Same-week interview scheduling</li>
              <li>→ Faster offer decisions</li>
              <li>→ Increase Google Ads budget</li>
              <li>→ Automated candidate communication</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-gray-700 text-sm">
            <strong>Total Investment:</strong> £40,000 | 
            <strong> Cost per Offer:</strong> £5,000 | 
            <strong> Campaign Duration:</strong> 11 months
          </p>
        </div>
      </div>
    </div>
  );
};

export default OncologyDashboard;
