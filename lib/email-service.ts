import sgMail from '@sendgrid/mail';
import { FormData } from './firebase-service';
import { config } from './config';

// Configuration SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export interface EmailData extends FormData {
  dateCreation?: string;
}

export const sendProspectEmail = async (prospectData: EmailData): Promise<void> => {
  try {
    const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/trouvermonchantier.firebasestorage.app/o/logo.png?alt=media&token=becd91c3-7d25-4ac2-80a9-6a6c796bd021';
    
    // Email HTML template
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau prospect - Trouver Mon Chantier</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: white;
                border-radius: 12px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #ff7e5f;
            }
            .logo {
                max-width: 200px;
                height: auto;
                margin-bottom: 15px;
            }
            .title {
                color: #ff7e5f;
                font-size: 24px;
                font-weight: bold;
                margin: 0;
            }
            .subtitle {
                color: #666;
                font-size: 16px;
                margin: 5px 0 0 0;
            }
            .prospect-info {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .info-row {
                display: flex;
                margin-bottom: 12px;
                align-items: flex-start;
            }
            .info-label {
                font-weight: bold;
                color: #ff7e5f;
                min-width: 120px;
                margin-right: 10px;
            }
            .info-value {
                color: #333;
                flex: 1;
            }
            .source-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
            }
            .source-hero {
                background-color: #e3f2fd;
                color: #1976d2;
            }
            .source-popup {
                background-color: #fff3e0;
                color: #f57c00;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .cta-section {
                background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin: 20px 0;
            }
            .cta-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="${logoUrl}" alt="Trouver Mon Chantier" class="logo">
                <h1 class="title">Nouveau Prospect</h1>
                <p class="subtitle">Une nouvelle demande vient d'être reçue</p>
            </div>

            <div class="cta-section">
                <div class="cta-title">🎯 Action Requise</div>
                <p style="margin: 0;">Contactez ce prospect sous 24h pour maximiser vos chances de conversion</p>
            </div>

            <div class="prospect-info">
                <h3 style="color: #ff7e5f; margin-top: 0;">📋 Informations du Prospect</h3>
                
                <div class="info-row">
                    <span class="info-label">👤 Nom :</span>
                    <span class="info-value">${prospectData.prenom} ${prospectData.nom}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">📧 Email :</span>
                    <span class="info-value"><a href="mailto:${prospectData.email}" style="color: #ff7e5f;">${prospectData.email}</a></span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">📞 Téléphone :</span>
                    <span class="info-value"><a href="tel:${prospectData.telephone}" style="color: #ff7e5f;">${prospectData.telephone}</a></span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">🏗️ Projet :</span>
                    <span class="info-value">${prospectData.motif}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">📅 Date :</span>
                    <span class="info-value">${prospectData.dateCreation || new Date().toLocaleString('fr-FR')}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">🎯 Source :</span>
                    <span class="info-value">
                        <span class="source-badge ${prospectData.source === 'hero' ? 'source-hero' : 'source-popup'}">
                            ${prospectData.source === 'hero' ? '🏠 Formulaire Principal' : '🚀 Popup Exit Intent'}
                        </span>
                    </span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">✅ RGPD :</span>
                    <span class="info-value">${prospectData.rgpd ? '✅ Accepté' : '❌ Non accepté'}</span>
                </div>
            </div>

            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #2e7d32; margin-top: 0;">💡 Conseils de Suivi</h4>
                <ul style="margin: 0; padding-left: 20px; color: #2e7d32;">
                    <li>Appelez dans les 2 heures pour un taux de conversion optimal</li>
                    <li>Préparez 2-3 questions sur le projet avant l'appel</li>
                    <li>Proposez un rendez-vous sur site si pertinent</li>
                    <li>Envoyez un email de suivi avec vos coordonnées</li>
                </ul>
            </div>

            <div class="footer">
                <p><strong>Trouver Mon Chantier</strong></p>
                <p>Email automatique généré le ${new Date().toLocaleString('fr-FR')}</p>
                <p style="font-size: 12px; color: #999;">
                    Ce prospect a donné son consentement RGPD pour être recontacté dans le cadre de sa demande.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Version texte simple
    const textContent = `
NOUVEAU PROSPECT - TROUVER MON CHANTIER

Informations du prospect :
- Nom : ${prospectData.prenom} ${prospectData.nom}
- Email : ${prospectData.email}
- Téléphone : ${prospectData.telephone}
- Projet : ${prospectData.motif}
- Date : ${prospectData.dateCreation || new Date().toLocaleString('fr-FR')}
- Source : ${prospectData.source === 'hero' ? 'Formulaire Principal' : 'Popup Exit Intent'}
- RGPD : ${prospectData.rgpd ? 'Accepté' : 'Non accepté'}

Action requise : Contactez ce prospect sous 24h pour maximiser vos chances de conversion.

---
Email automatique généré le ${new Date().toLocaleString('fr-FR')}
    `;

    // Get email from site config directly
    const recipientEmail = config.company?.email || 'service@trouver-mon-chantier.fr';

    const msg = {
      to: recipientEmail,
      from: {
        email: 'service@trouver-mon-chantier.fr',
        name: 'Trouver Mon Chantier - Notifications'
      },
      subject: `🎯 Nouveau Prospect : ${prospectData.prenom} ${prospectData.nom} - ${prospectData.source === 'hero' ? 'Formulaire' : 'Popup'}`,
      text: textContent,
      html: htmlContent,
    };

    await sgMail.send(msg);
    console.log('Email sent successfully to:', msg.to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
