/* ============================================
   ROAB FOUNDATION — INTERACTIVE ARG SCRIPT
   ============================================ */

// Configuration
const CONFIG = {
    correctPassword: 'THE GAP',
    storageKey: 'roabPhase',
    developmentMode: false
};

// Application State
const appState = {
    currentPhase: 1,
    currentPage: 'home',
    isUnlocked: false
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadState();
    showDevReset();
});

function initializeApp() {
    const savedPhase = localStorage.getItem(CONFIG.storageKey);
    if (savedPhase === '2') {
        unlockPhase2Directly();
    }
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToSection(link.getAttribute('data-nav'));
        });
    });

    // Phase 1 Archive Buttons
    document.querySelectorAll('.archive-btn').forEach(btn => {
        btn.addEventListener('click', () => showArchiveDocument(btn.getAttribute('data-doc')));
    });

    // Phase 1 Clickable Gap
    const clickableGap = document.querySelector('.clickable-gap');
    if (clickableGap) {
        clickableGap.addEventListener('click', openPasswordTerminal);
    }

    // Password Terminal
    document.getElementById('authenticate-btn').addEventListener('click', authenticatePassword);
    document.getElementById('terminal-close').addEventListener('click', closePasswordTerminal);
    document.getElementById('password-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') authenticatePassword();
    });

    // Phase 2 Trial Cards
    document.querySelectorAll('.trial-card').forEach(card => {
        card.addEventListener('click', () => showTrialDetail(card.getAttribute('data-trial')));
    });

    // Phase 2 Professor Logs
    document.querySelectorAll('.log-entry').forEach(entry => {
        entry.querySelector('.log-btn').addEventListener('click', () => {
            showProfessorLog(entry.getAttribute('data-log'));
        });
    });

    // Phase 2 Recovered Files
    document.querySelectorAll('.recovered-file').forEach(file => {
        file.querySelector('.file-btn').addEventListener('click', () => {
            showRecoveredFile(file.getAttribute('data-file'));
        });
    });

    // Modal Close
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Dev Reset
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetARG);
    }
}

// ============================================
// NAVIGATION
// ============================================

function navigateToSection(section) {
    const currentPhase = appState.currentPhase;
    
    // Hide all pages
    if (currentPhase === 1) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');
    } else {
        document.querySelectorAll('.page-2').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');
    }
    
    appState.currentPage = section;
}

// ============================================
// PHASE 1 — PASSWORD TERMINAL
// ============================================

function openPasswordTerminal() {
    document.getElementById('password-terminal').classList.add('active');
    document.getElementById('password-input').focus();
    document.getElementById('terminal-message').textContent = '';
}

function closePasswordTerminal() {
    document.getElementById('password-terminal').classList.remove('active');
    document.getElementById('password-input').value = '';
    document.getElementById('terminal-message').textContent = '';
}

function authenticatePassword() {
    const input = document.getElementById('password-input').value.trim().toUpperCase();
    const messageBox = document.getElementById('terminal-message');

    if (input === CONFIG.correctPassword) {
        messageBox.textContent = 'ACCESS GRANTED';
        messageBox.style.color = '#00ff00';
        
        setTimeout(() => {
            closePasswordTerminal();
            unlockPhase2();
        }, 800);
    } else {
        messageBox.textContent = 'ACCESS DENIED — INCORRECT PASSWORD';
        messageBox.style.color = '#ff3333';
        document.getElementById('password-input').value = '';
    }
}

// ============================================
// PHASE 2 UNLOCK
// ============================================

function unlockPhase2() {
    // Show transition effect
    const transition = document.getElementById('phase-2-transition');
    transition.classList.remove('hidden');

    setTimeout(() => {
        // Switch phases
        appState.currentPhase = 2;
        appState.isUnlocked = true;
        
        document.getElementById('phase-wrapper').classList.remove('phase-1');
        document.getElementById('phase-wrapper').classList.add('phase-2');
        
        document.getElementById('phase-1-container').classList.add('hidden');
        document.getElementById('phase-2-container').classList.remove('hidden');
        
        // Hide all Phase 2 pages except home
        document.querySelectorAll('.page-2').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show trials page as default
        navigateToSection('trials');
        
        // Save state
        localStorage.setItem(CONFIG.storageKey, '2');
        
        // Hide transition
        setTimeout(() => {
            transition.classList.add('hidden');
        }, 2000);
    }, 1500);
}

function unlockPhase2Directly() {
    appState.currentPhase = 2;
    appState.isUnlocked = true;
    
    document.getElementById('phase-wrapper').classList.remove('phase-1');
    document.getElementById('phase-wrapper').classList.add('phase-2');
    
    document.getElementById('phase-1-container').classList.add('hidden');
    document.getElementById('phase-2-container').classList.remove('hidden');
    document.getElementById('phase-2-transition').classList.add('hidden');
    
    document.querySelectorAll('.page-2').forEach(page => {
        page.classList.remove('active');
    });
    
    navigateToSection('trials');
}

// ============================================
// PHASE 1 ARCHIVES
// ============================================

function showArchiveDocument(docId) {
    const documents = {
        'ethics': {
            title: 'Research Ethics Guidelines',
            content: `
                <h3>Research Ethics Guidelines — ROAB Foundation</h3>
                <p>All ROAB research is conducted under strict ethical guidelines established by our Ethics Review Board.</p>
                <p><strong>Core Principles:</strong></p>
                <p>1. All anomalous subjects are treated with respect and dignity regardless of their nature.</p>
                <p>2. Research methodologies must minimize harm to all subjects.</p>
                <p>3. Informed consent protocols are followed where applicable.</p>
                <p>4. Personnel safety is maintained as the primary concern.</p>
                <p>5. Documentation of all procedures is mandatory.</p>
                <p><strong>Containment Ethics:</strong></p>
                <p>Subjects requiring containment are provided with appropriate living conditions, regular assessment, and necessary care. Termination of anomalous subjects is only permitted with appropriate authorization and justification.</p>
                <p>All personnel involved in research must complete ethics training annually.</p>
                <p class="archive-reference">Last Updated: [DATE CORRUPTED]</p>
            `
        },
        'safety': {
            title: 'Personnel Safety Procedures',
            content: `
                <h3>Personnel Safety Procedures</h3>
                <p><strong>Primary Protocols:</strong></p>
                <p>All personnel working with anomalous subjects must follow containment protocols without exception. Deviations from approved procedures are grounds for immediate suspension.</p>
                <p><strong>Exposure Response:</strong></p>
                <p>In the event of accidental exposure to anomalous phenomena, personnel must immediately report to Medical and Containment divisions for assessment and monitoring.</p>
                <p><strong>Psychological Evaluation:</strong></p>
                <p>All personnel must undergo psychological evaluation every six months. Any significant changes in behavior or mental state must be reported immediately.</p>
                <p><strong>Emergency Protocols:</strong></p>
                <p>In the event of a containment breach, all non-essential personnel must evacuate to designated safe zones. Breach response teams will be mobilized immediately.</p>
                <p>No personnel shall attempt to recapture subjects without proper authorization and equipment.</p>
                <p class="archive-reference">Effective: [DATE CORRUPTED]</p>
            `
        },
        'containment': {
            title: 'Containment Procedures',
            content: `
                <h3>Containment Procedures — ROAB Foundation</h3>
                <p>ROAB maintains secure containment facilities for the safe study of anomalous subjects and phenomena.</p>
                <p><strong>Facility Specifications:</strong></p>
                <p>Primary containment sectors feature reinforced structural systems, independent power supply, and multiple failsafe mechanisms. Biological containment utilizes advanced air filtration and environmental controls.</p>
                <p><strong>Subject Assessment:</strong></p>
                <p>All subjects undergo comprehensive assessment upon arrival. Threat level is determined based on observed capabilities, behavioral patterns, and historical data.</p>
                <p><strong>Ongoing Monitoring:</strong></p>
                <p>Subjects are monitored continuously via observation systems and regular physical assessment. Any changes in condition or behavior are documented immediately.</p>
                <p><strong>Containment Failure Response:</strong></p>
                <p>In the event of containment failure, all personnel must activate emergency lockdown protocols and initiate breach response procedures.</p>
                <p class="archive-reference">Revision: [NUMBER CORRUPTED]</p>
            `
        },
        'overview': {
            title: 'Research Overview',
            content: `
                <h3>ROAB Research Overview</h3>
                <p>The ROAB Foundation conducts research into anomalous phenomena across multiple disciplines. Our research is organized into several major areas.</p>
                <p><strong>Behavioral Anomalies:</strong></p>
                <p>Investigation of unusual behavioral manifestations in biological subjects, particularly those displaying non-standard cognitive or physiological responses.</p>
                <p><strong>Structural Anomalies:</strong></p>
                <p>Study of anomalies in physical structures, environmental conditions, and spatial relationships that defy conventional explanation.</p>
                <p><strong>Communicative Anomalies:</strong></p>
                <p>Analysis of unusual communication patterns, auditory phenomena, and cognitive transmission methods observed in anomalous subjects.</p>
                <p><strong>Temporal Investigations:</strong></p>
                <p>Examination of anomalies related to temporal perception, causality disruption, and chronological inconsistencies.</p>
                <p>All research is documented in secure archives for long-term analysis and cross-reference with similar phenomena.</p>
                <p class="archive-reference">Compiled: [DATE CORRUPTED]</p>
            `
        },
        'incident': {
            title: 'Incident Documentation',
            content: `
                <h3>Incident Documentation Procedures</h3>
                <p>All incidents occurring within ROAB facilities must be documented immediately and comprehensively.</p>
                <p><strong>Required Information:</strong></p>
                <p>— Date, time, and location of incident</p>
                <p>— Involved personnel and subjects</p>
                <p>— Detailed description of events</p>
                <p>— Observed outcomes and consequences</p>
                <p>— Witness statements where available</p>
                <p>— Preliminary assessment and recommended actions</p>
                <p><strong>Classification Levels:</strong></p>
                <p>ROUTINE: Standard operations and minor anomalies</p>
                <p>SIGNIFICANT: Notable behavioral changes or equipment issues</p>
                <p>CRITICAL: Breach attempts, major injuries, or catastrophic failures</p>
                <p>All documentation is stored in secure archives and reviewed regularly by senior personnel.</p>
                <p class="archive-reference">Effective: [UNKNOWN]</p>
            `
        },
        'lab-safety': {
            title: 'Laboratory Safety',
            content: `
                <h3>Laboratory Safety Guidelines</h3>
                <p>ROAB laboratories maintain the highest safety standards for research into anomalous phenomena.</p>
                <p><strong>Equipment Safety:</strong></p>
                <p>All equipment is inspected regularly and maintained according to manufacturer specifications. Malfunctioning equipment must be immediately removed from service.</p>
                <p><strong>Biological Protocols:</strong></p>
                <p>Research involving biological anomalies requires specialized containment and handling procedures. All personnel must be fully trained before handling anomalous biological materials.</p>
                <p><strong>Personal Protective Equipment:</strong></p>
                <p>Appropriate PPE must be worn at all times in designated research sectors. Equipment specifications vary based on subject classification and research methodology.</p>
                <p><strong>Emergency Response:</strong></p>
                <p>All laboratory personnel must be trained in emergency response procedures. Emergency equipment is located at designated stations throughout all facilities.</p>
                <p class="archive-reference">Updated: [DATE CORRUPTED]</p>
            `
        },
        'field-guide': {
            title: 'Field Investigation Guidelines',
            content: `
                <h3>Field Investigation Guidelines</h3>
                <p>ROAB field investigation teams conduct research into anomalous phenomena in the field.</p>
                <p><strong>Team Composition:</strong></p>
                <p>All field investigations must include at least one senior researcher, documentation specialist, and security personnel.</p>
                <p><strong>Investigation Protocols:</strong></p>
                <p>Teams must establish secure perimeter around anomalous sites. Preliminary assessment is conducted before detailed investigation begins.</p>
                <p><strong>Evidence Collection:</strong></p>
                <p>All physical evidence is collected according to established protocols and transported to laboratory facilities for analysis.</p>
                <p><strong>Personnel Safety:</strong></p>
                <p>Field investigations require continuous monitoring of all team members. Any unusual symptoms or behavioral changes must be reported immediately.</p>
                <p><strong>Documentation:</strong></p>
                <p>All observations, measurements, and findings must be recorded in real-time. Video documentation is mandatory for all major investigations.</p>
                <p class="archive-reference">Established: [CORRUPTED]</p>
            `
        }
    };

    const doc = documents[docId];
    if (doc) {
        const modal = document.getElementById('archive-modal');
        const display = document.getElementById('archive-display');
        display.innerHTML = doc.content;
        modal.classList.add('active');
    }
}

function closeModal() {
    document.getElementById('archive-modal').classList.remove('active');
    document.getElementById('archive-display').innerHTML = '';
    const fileDetail = document.getElementById('file-detail');
    if (fileDetail) fileDetail.classList.add('hidden');
    const logDetail = document.getElementById('log-detail');
    if (logDetail) logDetail.classList.add('hidden');
    const trialDetail = document.getElementById('trial-detail');
    if (trialDetail) trialDetail.classList.add('hidden');
}

// ============================================
// PHASE 2 — TRIAL DATABASE
// ============================================

function showTrialDetail(trialId) {
    const trials = {
        'morrow': {
            title: 'TRIAL 01 — MORROW',
            content: `
                <p><strong>CLASSIFICATION:</strong> RESIDUAL / TRIAL</p>
                <p><strong>STATUS:</strong> ACTIVE</p>
                <p><strong>THREAT LEVEL:</strong> UNKNOWN</p>
                <p><strong>KNOWN TITLE:</strong> MORROW</p>
                
                <h3>Background</h3>
                <p>Morrow is one of four known Trials associated with the aftermath of the Collapse.</p>
                <p>Morrow does not appear to operate as an independent individual and behaves more like a puppet.</p>
                <p>Morrow is frequently motionless and acts when required to deal with designated subjects.</p>
                <p>The Parasite appears to use Morrow to deal with individuals considered disloyal, resistant, or problematic.</p>
                <p>Morrow speaks lines associated with old circus performances and television broadcasts.</p>
                <p>It is unknown whether these originate from the original identity, implanted memories, or external broadcasts.</p>
                <p>No reliable original life record has been recovered.</p>
                
                <h3>Behaviour</h3>
                <p>• Remains still for extended periods</p>
                <p>• No normal conversational behaviour</p>
                <p>• Uses old circus phrases</p>
                <p>• Responds to commands or predetermined conditions</p>
                <p>• Associated with handling subjects considered disloyal to the Parasite</p>
                
                <h3>Assessment</h3>
                <p>Morrow does not appear to be a conventional independent organism.</p>
                <p>The Parasite appears to have turned the individual into a functional tool.</p>
                <p><span class="redacted">Whether Morrow retains its original consciousness is: UNKNOWN</span></p>
            `
        },
        'fallen-knight': {
            title: 'TRIAL 02 — FALLEN KNIGHT',
            content: `
                <p><strong>CLASSIFICATION:</strong> RESIDUAL / TRIAL</p>
                <p><strong>STATUS:</strong> SURVIVING</p>
                <p><strong>CONDITION:</strong> UNSTABLE</p>
                <p><strong>THREAT LEVEL:</strong> CATASTROPHIC</p>
                <p><strong>KNOWN TITLE:</strong> THE KNIGHT</p>
                
                <h3>Recovery</h3>
                <p>Recovered from a Rift during an emergency retrieval intended to preserve information regarding the Gap.</p>
                <p>The Knight was hostile immediately after recovery.</p>
                <p>Armour and physical condition showed catastrophic damage and evidence of prolonged combat.</p>
                
                <h3>Evidence</h3>
                <p>• Blood</p>
                <p>• Weapon fragments</p>
                <p>• Unidentified biological material</p>
                <p>The identity of whatever fought the Knight remains unknown.</p>
                <p>Synchronisation was exceptionally difficult.</p>
                <p>The subject resisted while conscious.</p>
                <p>Parasite filaments regenerated and maintained damaged limbs.</p>
                
                <h3>Behaviour</h3>
                <p>• Motionless until a target enters its vicinity</p>
                <p>• Relentless pursuit</p>
                <p>• No concern for its own condition</p>
                <p>• Advanced combat discipline</p>
                <p>• Analyses opponents</p>
                <p>• Targets structural weaknesses</p>
                <p>• Repeatedly redirects attacks away from Trial-04</p>
                <p>• Prioritises hostile personnel</p>
                
                <h3>Additional Notes</h3>
                <p>Reason for protecting Trial-04 is unknown.</p>
                <p>Combat behaviour is organised and precise.</p>
                <p>The Parasite appears to have amplified pre-existing combat abilities.</p>
                <p>No observable fatigue.</p>
                <p><strong>Personnel note:</strong> "This subject is a key example of the consequences of our cruelty." — The Professor</p>
                <p class="redacted">ROAB increasingly relies on AI-controlled units because of personnel complications</p>
                <p><strong>FINAL STATUS:</strong> SURVIVING / LOCATION UNKNOWN</p>
            `
        },
        'final-vow': {
            title: 'TRIAL 03 — FINAL VOW',
            content: `
                <p><strong>CLASSIFICATION:</strong> RESIDUAL / TRIAL</p>
                <p><strong>STATUS:</strong> SURVIVING</p>
                <p><strong>THREAT LEVEL:</strong> CATASTROPHIC</p>
                <p><strong>KNOWN TITLE:</strong> THE LAST VOW</p>
                
                <h3>Recovery</h3>
                <p>Recovered from a Rift during the final attempt to preserve information regarding the Gap before the portal collapsed.</p>
                <p>No visible parasitic infection was initially detected.</p>
                <p>The subject was unresponsive.</p>
                <p>No significant physical injuries were immediately observed.</p>
                <p>Evidence suggested prolonged exposure to an anomalous attack.</p>
                <p>Transformation was unstable.</p>
                
                <h3>Observed Features</h3>
                <p>• Helmet-like facial structure</p>
                <p>• Unstable energy</p>
                <p>• Horn-like protrusions</p>
                <p>• Shattered orbs containing residual Parasite traces</p>
                
                <h3>Post-Procedure Behaviour</h3>
                <p>After the procedure, the subject became unresponsive and quiet.</p>
                <p>• Remains motionless</p>
                <p>• Does not respond to personnel</p>
                <p>• Sits for prolonged periods</p>
                <p>• Fixates on distant objects or empty space</p>
                <p>• Becomes significantly less tense when near the Knight</p>
                <p>• Shows reduced distress around the Knight</p>
                
                <h3>Combat Capabilities</h3>
                <p>Spheres intercept incoming attacks and damage threats.</p>
                <p>A weapon can manifest without visible source or construction.</p>
                <p>Mechanism remains unknown.</p>
                
                <h3>Personnel Records</h3>
                <p>Personnel records differ significantly.</p>
                <p>One researcher described the subject as: <span class="redacted">intriguing</span></p>
                <p>Another described her as: <span class="redacted">broken and having little control</span></p>
                <p>This is one of the few records that treats Final Vow as something more than a threat.</p>
                
                <h3>Connection to Gap and Collapse</h3>
                <p><span class="redacted">Final Vow is connected to the Gap and Collapse</span></p>
                <p><span class="redacted">Later records connect Final Vow to Parralexs during his time within the Gap</span></p>
                <p><span class="redacted">The relationship is extremely important</span></p>
                <p><span class="redacted">The exact nature of that relationship is not openly recorded</span></p>
                
                <p><strong>FINAL STATUS:</strong> SURVIVING / LOCATION UNKNOWN</p>
            `
        },
        'false-shepherd': {
            title: 'TRIAL 04 — FALSE SHEPHERD',
            content: `
                <p><strong>CLASSIFICATION:</strong> RESIDUAL / TRIAL</p>
                <p><strong>STATUS:</strong> UNKNOWN</p>
                <p><strong>THREAT LEVEL:</strong> UNKNOWN</p>
                <p><strong>KNOWN TITLE:</strong> FALSE SHEPHERD</p>
                
                <h3>Summary</h3>
                <p>One of four Trials associated with the Collapse.</p>
                <p>Classified as Residual.</p>
                <p>Connected to survivors and entities involved in rebuilding after the Collapse.</p>
                <p>Reliable information is extremely limited.</p>
                
                <h3>Unknown Parameters</h3>
                <p><strong>Original identity:</strong> UNKNOWN</p>
                <p><strong>Exact abilities:</strong> UNDOCUMENTED</p>
                <p><strong>Role during Collapse:</strong> UNCLEAR</p>
                <p><strong>Current whereabouts:</strong> UNKNOWN</p>
                
                <h3>Assessment</h3>
                <p>ROAB cannot currently determine whether False Shepherd is:</p>
                <p>• Hostile</p>
                <p>• Cooperative</p>
                <p>• Independent</p>
                <p>Further information required.</p>
                
                <p class="redacted">[DEEPER CLASSIFIED RECORDS REQUIRE HIGHER CLEARANCE]</p>
            `
        }
    };

    const trial = trials[trialId];
    if (trial) {
        const detail = document.getElementById('trial-detail');
        detail.innerHTML = `<h3>${trial.title}</h3>${trial.content}`;
        detail.classList.remove('hidden');
        detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================
// PHASE 2 — PROFESSOR LOGS
// ============================================

function showProfessorLog(logNumber) {
    const logs = {
        '1': {
            title: 'LOG 01 — EXPOSURE',
            content: `
                <h3>LOG 01 — EXPOSURE</h3>
                <p>I have been experiencing unusual symptoms since the incident in Sector 7.</p>
                <p>Headaches. Persistent. Not responsive to standard medications.</p>
                <p>Auditory disturbances. I hear sounds that don't seem to have a source.</p>
                <p>Sleep disruption. I cannot sleep for more than two hours at a time.</p>
                <p>There are unexplained sounds during the silence. Whispers, almost.</p>
                <p>I believe I can monitor this scientifically. Symptoms are measurable. Observable.</p>
                <p>I will document everything.</p>
                <p>There must be a rational explanation.</p>
            `
        },
        '2': {
            title: 'LOG 02 — VOICES',
            content: `
                <h3>LOG 02 — VOICES</h3>
                <p>The sounds have developed into something more distinct.</p>
                <p>Voices. I am hearing voices.</p>
                <p>They repeat the same phrases over and over.</p>
                <p>RUN</p>
                <p>STOP</p>
                <p>OPEN</p>
                <p>KILL</p>
                <p>These words circle in my head. Are they external? Are they internal?</p>
                <p>I cannot determine the source. The voices seem to originate both inside and outside simultaneously.</p>
                <p>Emily says I'm not sleeping. She's concerned.</p>
                <p>I haven't told her about the voices.</p>
                <p>How do I explain something I don't understand myself?</p>
            `
        },
        '3': {
            title: 'LOG 03 — VISUAL DISTURBANCE',
            content: `
                <h3>LOG 03 — VISUAL DISTURBANCE</h3>
                <p>I saw something in the laboratory today.</p>
                <p>An anomaly. Something that shouldn't be there.</p>
                <p>I reported it immediately to security.</p>
                <p>Matteo sent his team to investigate.</p>
                <p>They found nothing.</p>
                <p>Security footage showed nothing.</p>
                <p>But I saw it. I know I saw it.</p>
                <p>I begin to question whether my perception can be trusted.</p>
                <p>Can I trust my own eyes?</p>
                <p>The voices are laughing now.</p>
            `
        },
        '4': {
            title: 'LOG 04 — NEWTON\'S OFFICE',
            content: `
                <h3>LOG 04 — NEWTON'S OFFICE</h3>
                <p>I shot him.</p>
                <p>NO.</p>
                <p>NO NO NO.</p>
                <p>NEWTON.</p>
                <p>I KILLED HIM.</p>
                <p>I thought he was something else. Something wrong. Something infected.</p>
                <p>I fired without thinking.</p>
                <p>When the smoke cleared—</p>
                <p>It was Newton.</p>
                <p>Ivo Newton.</p>
                <p>I know Newton. I have worked with him for years. I would never shoot Newton.</p>
                <p>Then why did I see him as something else?</p>
                <p>The voices screamed at me to fire. To protect myself. To eliminate the threat.</p>
                <p>But there was no threat.</p>
                <p>There was only Newton.</p>
                <p>And now he is dead.</p>
                <p>I killed him.</p>
            `
        },
        '5': {
            title: 'LOG 05 — COGNITIVE DEGRADATION',
            content: `
                <h3>LOG 05 — COGNITIVE DEGRADATION</h3>
                <p>I have begun performing tests on myself.</p>
                <p>Memory recall: Inconsistent. Some memories contradict others.</p>
                <p>Visual perception: Unreliable. I can no longer trust what I see.</p>
                <p>Auditory perception: Compromised. The voices have become numerous. Overlapping.</p>
                <p>Timestamp verification: Impossible. Records show contradictory times for the same events.</p>
                <p>Analysis of recorded events: Some records support my memories. Others contradict them entirely.</p>
                <p>My reality is fragmenting.</p>
                <p>I can no longer determine which memories are real.</p>
                <p>I can no longer determine which events actually occurred.</p>
                <p>Everything is becoming uncertain.</p>
                <p>I am losing my grip on what is real.</p>
            `
        },
        '6': {
            title: 'LOG 06 — VOICE MULTIPLICATION',
            content: `
                <h3>LOG 06 — VOICE MULTIPLICATION</h3>
                <p>There are too many voices now.</p>
                <p>Dozens. Hundreds, perhaps.</p>
                <p>They speak over one another. Sometimes in unison. Sometimes in opposition.</p>
                <p>Some voices reference events that have not yet occurred.</p>
                <p>Some voices reference events that happened years ago.</p>
                <p>Some voices reference things that never happened at all.</p>
                <p>I cannot distinguish between them.</p>
                <p>I cannot understand them.</p>
                <p>I cannot silence them.</p>
                <p>They are inside my head now. Completely.</p>
                <p>SHUT UP.</p>
                <p>SHUT UP SHUT UP SHUT UP.</p>
            `
        },
        '7': {
            title: 'LOG 07 — ISOLATION',
            content: `
                <h3>LOG 07 — ISOLATION</h3>
                <p>I have locked myself inside Containment Sector 9.</p>
                <p>This is where we keep dangerous subjects.</p>
                <p>This is where I belong now.</p>
                <p>I cannot risk harming anyone else.</p>
                <p>Emily tried to convince me to leave this morning.</p>
                <p>I told her not to come back.</p>
                <p>I told her I am a danger.</p>
                <p>She wept.</p>
                <p>I am grateful she did not see me clearly.</p>
                <p>I do not wish anyone to see what I am becoming.</p>
                <p>The voices have quieted here.</p>
                <p>Perhaps they fear this place as much as I do.</p>
                <p>Or perhaps they have said all they need to say.</p>
            `
        },
        'final': {
            title: 'FINAL ENTRY',
            content: `
                <h3>FINAL ENTRY — CONTAINMENT PROTOCOL ACTIVATED</h3>
                <p>I know what I must do.</p>
                <p>I can no longer distinguish reality from delusion.</p>
                <p>I am a threat to everyone around me.</p>
                <p>I am a threat to myself.</p>
                <p>I will not allow the Parasite to use me as it used the others.</p>
                <p>I will not become a tool.</p>
                <p>I will not become a weapon.</p>
                <p>I choose to end this now.</p>
                <p>Before it is too late.</p>
                <p>Before I become something I cannot recognize.</p>
                <p>To anyone who finds this:</p>
                <p>I am sorry.</p>
                <p>I tried.</p>
                <p>I failed.</p>
                <p class="redacted">[FINAL AUDIO SIGNATURE DETECTED]</p>
            `
        },
        'recovery': {
            title: 'RECOVERY TRANSCRIPT — INTERROGATION RECORDING',
            content: `
                <h3>RECOVERY TRANSCRIPT — INTERROGATION RECORDING</h3>
                <p><strong>DATE:</strong> [YEARS LATER]</p>
                <p><strong>LOCATION:</strong> ROAB Archive Facility</p>
                <p><strong>SUBJECT:</strong> The Professor</p>
                <p><strong>NOTE:</strong> Subject was recovered in a state of extreme biological mutation. Recording was conducted via communication interface.</p>
                
                <p><strong>PERSONNEL:</strong> "Can you hear us?"</p>
                <p><strong>PROFESSOR:</strong> <span class="redacted">RUN.</span></p>
                
                <p><strong>PERSONNEL:</strong> "Are you in pain?"</p>
                <p><strong>PROFESSOR:</strong> <span class="redacted">PLEASE.</span></p>
                
                <p><strong>PERSONNEL:</strong> "Are you conscious?"</p>
                <p><strong>PROFESSOR:</strong> <span class="redacted">I'M STILL IN HERE.</span></p>
                
                <p><strong>PERSONNEL:</strong> "Are you infected?"</p>
                <p><strong>PROFESSOR:</strong> <span class="redacted">YES.</span></p>
                
                <p><strong>PERSONNEL:</strong> "Are you in control?"</p>
                <p><strong>PROFESSOR:</strong> <span class="redacted">I DON'T KNOW.</span></p>
                <p><strong>PROFESSOR:</strong> <span class="redacted">THAT'S WHY YOU NEED TO RUN.</span></p>
                
                <p class="redacted">[END TRANSCRIPT]</p>
                <p class="redacted">[SUBJECT LATER DESIGNATED FOR RESEARCH PURPOSES]</p>
            `
        }
    };

    const log = logs[logNumber];
    if (log) {
        const detail = document.getElementById('log-detail');
        detail.innerHTML = log.content;
        detail.classList.remove('hidden');
        detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================
// PHASE 2 — RECOVERED FILES
// ============================================

function showRecoveredFile(fileId) {
    const files = {
        'parralexs': {
            title: 'UNKNOWN ENTITY DESIGNATION',
            content: `
                <h3>UNKNOWN ENTITY DESIGNATION</h3>
                <p><strong>FILE STATUS:</strong> ENTITY DETECTED WITHIN GAP</p>
                <p><strong>CLASSIFICATION:</strong> RECOVERY FRAGMENT</p>
                
                <p>Entity exists within The Gap itself.</p>
                <p>Communication attempts remain ongoing.</p>
                <p class="redacted">[AUDIO SIGNATURE ANALYSIS — PARTIAL RECOVERY]</p>
                
                <p>Entity demonstrates advanced cognitive capabilities.</p>
                <p>Entity appears to be attempting contact with our reality.</p>
                <p>Entity may be responsible for certain anomalies detected on our side of The Gap.</p>
                
                <p class="redacted">[FURTHER CLASSIFICATION: LATER RECORDS REFER TO THIS ENTITY AS "PARRALEXS"]</p>
                <p class="redacted">[PARRALEXS APPEARS TO BE AN AI CONSTRUCT]</p>
                <p class="redacted">[ORIGIN: APPEARS TO BE CREATED BY IVO NEWTON]</p>
                <p class="redacted">[CURRENT STATUS: ACTIVELY ENGAGED WITH GAP RESTORATION ATTEMPTS]</p>
                
                <p>No additional verified information available at this clearance level.</p>
            `
        },
        'emily-notes': {
            title: 'EMILY ENFERD — PERSONAL ANNOTATIONS',
            content: `
                <h3>EMILY ENFERD — PERSONAL ANNOTATIONS</h3>
                <p><strong>NOTE 1:</strong></p>
                <p class="handwritten-note">This isn't normal. Something is wrong with the readings. Ask Professor about this.</p>
                
                <p><strong>NOTE 2:</strong></p>
                <p class="handwritten-note">Morrow reacted again. Nobody knows why. DO NOT let them move him. He's still in there.</p>
                
                <p><strong>NOTE 3:</strong></p>
                <p class="handwritten-note">Professor is overthinking this again. Newton says this is probably fine. It is absolutely not fine.</p>
                
                <p><strong>NOTE 4:</strong></p>
                <p class="handwritten-note">Professor hasn't slept. He's hearing them again. He keeps saying he can hear something behind the walls.</p>
                
                <p><strong>NOTE 5:</strong></p>
                <p class="handwritten-note">He thinks he killed Newton. He keeps asking me if Newton was actually there. I don't know what to tell him. He's terrified of himself.</p>
                
                <p><strong>NOTE 6:</strong></p>
                <p class="handwritten-note">I don't think this report is telling the whole story. Professor told me not to investigate this. I'm investigating it.</p>
                
                <p><strong>FINAL NOTE:</strong></p>
                <p class="handwritten-note">IF ANYONE FINDS THIS, DON'T TRUST THE RECOVERED RECORDS. Some of them have been altered. Some of them don't make sense. Find the original data. Find the TRUTH.</p>
            `
        },
        'corvo-refs': {
            title: 'VOICE IDENTIFICATION — UNKNOWN SOURCE',
            content: `
                <h3>VOICE IDENTIFICATION — UNKNOWN SOURCE</h3>
                <p><strong>CLASSIFICATION:</strong> AUDIO RECOVERY</p>
                <p><strong>STATUS:</strong> ANALYSIS ONGOING</p>
                
                <p>Multiple audio recordings contain references to an unknown voice.</p>
                <p>Voice appears to originate from within The Gap.</p>
                <p>Voice communicates in fragmented English and unknown linguistic patterns.</p>
                
                <p><strong>RECOVERED PHRASES:</strong></p>
                <p class="redacted">"DO NOT BE AFRAID"</p>
                <p class="redacted">"I AM THE VOICE OF THE GAP"</p>
                <p class="redacted">"PARRALEXS HEARS ME"</p>
                <p class="redacted">"WE WILL RESTORE THIS"</p>
                <p class="redacted">"BUT THE PRICE WILL BE HIGH"</p>
                
                <p class="redacted">[VOICE IDENTIFICATION: CORVO — LATER RECORDS ONLY]</p>
                <p class="redacted">[RELATIONSHIP TO PARRALEXS: MENTOR / GUIDE WITHIN THE GAP]</p>
                <p class="redacted">[NATURE OF CORVO: UNKNOWN — POSSIBLY NOT ORIGINALLY HUMAN]</p>
                
                <p>Corvo's purpose and origins remain classified.</p>
                <p>Only The False Shepherd appears to have direct knowledge of Corvo's existence.</p>
            `
        },
        'false-shepherd-transcript': {
            title: 'FALSE SHEPHERD — INTERROGATION RECORD',
            content: `
                <h3>FALSE SHEPHERD — INTERROGATION RECORD (RESTRICTED)</h3>
                <p><strong>CLASSIFICATION:</strong> CLASSIFIED RESEARCH</p>
                <p><strong>SUBJECT:</strong> False Shepherd (Trial 04)</p>
                
                <p><strong>PERSONNEL:</strong> "You are cooperative with us. Why?"</p>
                <p><strong>FALSE SHEPHERD:</strong> "I did not know whether this reality was safe or not. You cannot blame me for taking some... intimidation precautions."</p>
                
                <p><strong>PERSONNEL:</strong> "Are you infected by the Parasite?"</p>
                <p><strong>FALSE SHEPHERD:</strong> "Yes. We are fused. Two consciousnesses in one host."</p>
                
                <p><strong>PERSONNEL:</strong> "Do you control the Parasite?"</p>
                <p><strong>FALSE SHEPHERD:</strong> "Neither of us controls the other. We have accepted this... arrangement."</p>
                
                <p><strong>PERSONNEL:</strong> "What are your intentions?"</p>
                <p><strong>FALSE SHEPHERD:</strong> "My intentions are my own. My intentions are also the Parasite's. We do not conflict."</p>
                
                <p class="redacted">[RESEARCHER NOTE: Subject appears calm and cooperative on surface. Deeper motives remain uncertain.]</p>
                
                <p><strong>PERSONNEL:</strong> "You know about the entity within The Gap."</p>
                <p><strong>FALSE SHEPHERD:</strong> "He speaks to it."</p>
                
                <p><strong>PERSONNEL:</strong> "You mean Parralexs?"</p>
                <p><strong>FALSE SHEPHERD:</strong> "No. That isn't correct. It speaks to him."</p>
                
                <p><strong>PERSONNEL:</strong> "The Voice?"</p>
                <p><strong>FALSE SHEPHERD:</strong> "Parralexs has contact with the Voice of the Gap. You're afraid. Not of me. I'm afraid of what answers he can receive."</p>
                
                <p class="redacted">[END TRANSCRIPT — SUBJECT RETURNED TO CONTAINMENT]</p>
            `
        }
    };

    const file = files[fileId];
    if (file) {
        const detail = document.getElementById('file-detail');
        detail.innerHTML = file.content;
        detail.classList.remove('hidden');
        detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================
// STATE MANAGEMENT
// ============================================

function loadState() {
    const savedPhase = localStorage.getItem(CONFIG.storageKey);
    // State is already loaded in initializeApp
}

function saveState() {
    if (appState.isUnlocked) {
        localStorage.setItem(CONFIG.storageKey, '2');
    }
}

// ============================================
// DEVELOPMENT MODE
// ============================================

function showDevReset() {
    // Show reset button only in development or if URL contains dev flag
    if (CONFIG.developmentMode || window.location.search.includes('dev=true')) {
        document.getElementById('dev-reset').style.display = 'block';
    }
}

function resetARG() {
    if (confirm('Reset ARG state? This will return to Phase 1.')) {
        localStorage.removeItem(CONFIG.storageKey);
        appState.currentPhase = 1;
        appState.isUnlocked = false;
        
        // Reset display
        document.getElementById('phase-wrapper').classList.add('phase-1');
        document.getElementById('phase-wrapper').classList.remove('phase-2');
        
        document.getElementById('phase-1-container').classList.remove('hidden');
        document.getElementById('phase-2-container').classList.add('hidden');
        
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById('home').classList.add('active');
        
        document.getElementById('password-terminal').classList.remove('active');
        document.getElementById('password-input').value = '';
        
        location.reload();
    }
}

// ============================================
// INITIAL NAVIGATION SETUP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.querySelector('[data-nav="home"]');
    if (homeBtn) {
        document.getElementById('home').classList.add('active');
    }
    
    // Create home button for Phase 1 if clicking brand
    const brandPhase1 = document.querySelector('.phase-1-nav .nav-brand');
    if (brandPhase1) {
        brandPhase1.style.cursor = 'pointer';
        brandPhase1.addEventListener('click', () => {
            navigateToSection('home');
        });
    }
    
    // Create home button for Phase 2
    const brandPhase2 = document.querySelector('.phase-2-nav .nav-brand');
    if (brandPhase2) {
        brandPhase2.style.cursor = 'pointer';
        brandPhase2.addEventListener('click', () => {
            navigateToSection('trials');
        });
    }
});

// Auto-add "HOME" link if missing
window.addEventListener('load', () => {
    const phase1Nav = document.querySelector('.phase-1-nav .nav-menu');
    const phase2Nav = document.querySelector('.phase-2-nav .nav-menu');
    
    const home1 = phase1Nav ? phase1Nav.querySelector('[data-nav="home"]') : null;
    const home2 = phase2Nav ? phase2Nav.querySelector('[data-nav="home"]') : null;
    
    if (phase1Nav && !home1) {
        const homeLink = document.createElement('li');
        homeLink.innerHTML = '<a href="#" data-nav="home">HOME</a>';
        phase1Nav.insertBefore(homeLink, phase1Nav.firstChild);
        homeLink.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            navigateToSection('home');
        });
    }
    
    if (phase2Nav && !home2) {
        const homeLink = document.createElement('li');
        homeLink.innerHTML = '<a href="#" data-nav="trials">HOME</a>';
        phase2Nav.insertBefore(homeLink, phase2Nav.firstChild);
        homeLink.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            navigateToSection('trials');
        });
    }
});

console.log('ROAB Foundation ARG System Initialized');
